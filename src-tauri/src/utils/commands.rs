use std::{fs::File, path::PathBuf, sync::Arc, time::Duration};

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
pub async fn get_info_version(url_str : String) -> Result<InfoVersion, String> {
    let response = reqwest::get(url_str).await.expect("Failed to get version info");
    let info = response
        .json::<InfoVersion>()
        .await
        .expect("Failed to parse version info");

    Ok(info)
}

#[tauri::command]
pub fn get_local_info_version(app: AppHandle) -> InfoVersion {
    let path = app
        .path()
        .resolve("Resource/Json/version.json", BaseDirectory::Resource)
        .unwrap();
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
