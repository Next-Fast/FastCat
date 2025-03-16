use std::{fmt::format, fs::{create_dir_all, File}, io::{self, Read, Seek, Write}, path::PathBuf, sync::Arc, time::Duration};

use eyre::Context;
use serde::de::value;
use tauri::{path::BaseDirectory, AppHandle, Manager};

use tauri_plugin_http::reqwest;
use zip::ZipArchive;

use crate::config::ManagerConfig;

use super::{pathget::{get_bepinex_dir, get_bepinex_dotnet_dir, get_doorstop_path, get_dotnet_dir}, InfoVersion, StateMutex};

#[tauri::command]
pub fn open_dir(path_str: String) {
    let path = PathBuf::from(path_str);
    if path.exists() {
        open::that(path).expect("Failed to open directory");
    }
}

#[tauri::command]
pub async fn get_github_version(url_str : String) -> Result<InfoVersion, String> {
    let response = reqwest::get(&url_str).await.expect("Failed to get github version");
    let text = response
        .text()
        .await
        .map_err(|e| e.to_string())?;

    let info: InfoVersion = serde_json::from_str(&text)
        .map_err(|e| e.to_string())?;
    
    Ok(info)
}

#[tauri::command]
pub fn get_local_version(app: AppHandle) -> InfoVersion {
    let path = app
        .path()
        .resolve("version.json", BaseDirectory::AppData)
        .unwrap();
    if !path.exists() {
        return InfoVersion {
            bepinex: 0,
            mods: 0,
            hash: 0,
        };
    }
    let file = File::open(path).unwrap();
    let info = serde_json::from_reader(file).unwrap();

    info
}

#[tauri::command]
pub async fn download_bepinex<'a>(app: &tauri::AppHandle, lock_config: StateMutex<'a, ManagerConfig>, version : String, is_release : bool,hash : String) -> Result<(), String> {
    let mut config = lock_config.lock().unwrap();
    let _url_prefix = match is_release {
        true => format!("{}https://github.com/bepinex/BepInEx/releases/download/v{}", config.proxy_url, version),
        false => format!("https://builds.bepinex.dev/projects/bepinex_be/{}", version),
    };
    let _url_postfix = match is_release {
        true => version.clone(),
        false => format!("6.0.0-be.{}+{}.zip", version, hash),
    };
    let _url = format!("{}/BepInEx-Unity.IL2CPP-win-x86-{}", _url_prefix, _url_postfix);
    let path = app.path().resolve(format!("BepInEx-{}.zip", version), BaseDirectory::Temp).unwrap();
    let unzip_dir = &get_bepinex_dir(app).join(version);
    let dotnet_path = get_bepinex_dotnet_dir(app);
    let doorstop_path = get_doorstop_path(app);

    if path.exists() || unzip_dir.exists() {
        return Ok(());
    }

    let response = reqwest::get(&_url).await.context("Failed to download BepInEx").map_err(|e| e.to_string())?;
    let mut file = File::create(path).map_err(|e| e.to_string())?;
    let content = response.bytes().await.context("Failed to get BepInEx content").map_err(|e| e.to_string())?;
    file.write_all(&content).map_err(|e| e.to_string())?;
    file.flush().map_err(|e| e.to_string())?;

    let mut  _zip = ZipArchive::new(file).map_err(|e| e.to_string())?;
    if !doorstop_path.exists() {
        unzip_doorstop(&mut _zip, &doorstop_path);
    }

    if !dotnet_path.exists() {
        create_dir_all(&dotnet_path).expect("Failed to create DotNet directory");
        unzip_dotnet(&mut _zip, &dotnet_path);
    }

    create_dir_all(unzip_dir).expect("Failed to create BepInEx directory");
    unizip_bepinex(&mut _zip, unzip_dir);

    Ok(())
}

fn unzip_dotnet<R: Read + Seek>(archive: &mut ZipArchive<R>, path : &PathBuf) {
    for i in 0..archive.len() {
        let mut file = archive.by_index(i).unwrap();
        if file.name().starts_with("dotnet/") {
            let old_path = match file.enclosed_name() {
                Some(name) => name,
                None => continue,
            };

            let strip_name = old_path.strip_prefix("dotnet/").unwrap(); 
            if file.is_dir() {
                create_dir_all(path.join(strip_name)).unwrap();
            }
            else {
                let mut new_file = File::create(path.join(strip_name)).unwrap();
                io::copy(&mut file, &mut new_file).unwrap();
            }
        }
    }
}

fn unzip_doorstop<R: Read + Seek>(archive: &mut ZipArchive<R>, path : &PathBuf) {
    let mut file = match archive.by_name("winhttp.dll") {
        Ok(file) => file,
        Err(..) => {
            println!("File winhttp.dll not found");
            return;
        }
    };

    let mut new_file = File::create(path).unwrap();
    io::copy(&mut file, &mut new_file).unwrap();
}

fn unizip_bepinex<R: Read + Seek>(archive: &mut ZipArchive<R>, path : &PathBuf) {
    // 将BepInEx 目录下内容解压到指定目录
    for i in 0..archive.len() {
        let mut file = archive.by_index(i).unwrap();
        if file.name().starts_with("BepInEx/") {
            let old_path = match file.enclosed_name() {
                Some(name) => name,
                None => continue,
            };

            let strip_name = old_path.strip_prefix("BepInEx/").unwrap(); 
            if file.is_dir() {
                create_dir_all(path.join(strip_name)).unwrap();
            }
            else {
                let mut new_file = File::create(path.join(strip_name)).unwrap();
                io::copy(&mut file, &mut new_file).unwrap();
            }
        }
    }
}

#[tauri::command]
pub async fn get_ping_latest(urls : Vec<String>) -> Result<String, String> {
    let mut latest_url = "".to_string();
    let mut latest_time = -1;
    let data = [6;66];
    let timeout = Duration::from_secs(1);
    let options = ping_rs::PingOptions { ttl: 128, dont_fragment: true };

    for url in urls {
        let result =  ping_rs::send_ping_async(&url.parse().unwrap(), timeout, Arc::new(&data), Some(&options)).await;
        match result {
            Ok(reply) => {
                let t = reply.rtt as i32;

                if latest_time == -1 {
                    latest_time = t;
                    latest_url = url;

                    continue;
                }

                if t < latest_time {
                    latest_time = t;
                    latest_url = url;
                }
            },
            Err(e) => {
                println!("{:?}", e);
            }
        }
    }

    Ok(latest_url)
}
