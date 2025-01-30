use std::{fs::File, path::PathBuf, sync::Arc, time::Duration};

use eyre::Context;
use tauri::{path::BaseDirectory, AppHandle, Manager};
use tauri_plugin_http::reqwest;

use super::InfoVersion;

#[tauri::command]
pub fn open_dir(path_str: String) {
    let path = PathBuf::from(path_str);
    if path.exists() {
        open::that(path).expect("Failed to open directory");
    }
}

#[tauri::command]
pub async fn get_github_version(url_str : String) -> Result<InfoVersion, String> {
    let response = reqwest::get(&url_str).await.context("Failed to get version from github".to_owned() + &url_str).map_err(|e| e.to_string())?;
    let info = response
        .json::<InfoVersion>()
        .await
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
