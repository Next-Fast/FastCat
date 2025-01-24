use std::{fs::File, path::PathBuf};

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
pub async fn get_info_version(url: String) -> Result<InfoVersion, String> {
    let response = reqwest::get(url).await.expect("Failed to get version info");
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
