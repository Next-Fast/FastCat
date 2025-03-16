use std::{fs, io, process::Command};
use serde::de::value;
use tauri::{ AppHandle};
use tauri_plugin_fs::Fs;

use crate::utils::{pathget::{get_LocalLow_path, get_doorstop_path, get_steam_exe_path}, StateMutex};

use super::{GameConfig, ManagerConfig};

#[tauri::command]
pub fn get_config(config: StateMutex<ManagerConfig>) -> ManagerConfig {
    config.lock().unwrap().clone()
}

#[tauri::command]
pub fn set_config(
    lang: String,
    game: Option<GameConfig>,
    proxy: Option<String>,
    config: StateMutex<ManagerConfig>,
    app: AppHandle,
) {
    let mut local = config.lock().unwrap();

    if lang != "" {
        local.set_lang(lang);
    }

    if let Some(game) = game {
        local.set_game_config(game);
    }

    if let Some(proxy) = proxy {
        local.set_proxy(proxy);
    }

    local.save(&app);
}

#[tauri::command]
pub fn set_proxy_url(url : String, config: StateMutex<ManagerConfig>, app: AppHandle) {
    let mut local = config.lock().unwrap();
    let set_url;
    if url != "" {
        set_url = url + "/";
    }
    else {
        set_url = "".to_string();
    }
    
    local.set_proxy_url(set_url);
    local.save(&app);
}

#[tauri::command]
pub fn has_bepinex(config: StateMutex<ManagerConfig>) -> bool {
    config.lock().unwrap().game_config.has_bepinex()
}

#[tauri::command]
pub fn region_config_path() -> String {
    let mut path = get_LocalLow_path();
    path.push("regionInfo.json");

    if !path.exists() {
        "".to_string()
    } else {
        path.to_str().unwrap().to_string()
    }
}

#[tauri::command]
pub async fn launch_game<'a>(
    app: AppHandle,
    moded: bool,
    lock_config: StateMutex<'a, ManagerConfig>,
) -> Result<(), String> {
    let config = lock_config.lock().unwrap();
    let mut  command = get_lanch_command(app, config.clone(), moded);

    command.spawn().expect("Failed to launch game");
    Ok(())
}

fn get_lanch_command(app: AppHandle, mut config: ManagerConfig, moded: bool) -> Command {
    let mut is_steam = false;
    let mut args = vec![];
    let mut winhttp_path = config.game_config.dir_path.clone();
    winhttp_path.push("winhttp.dll");

    if let Some(parent) = config.game_config.dir_path.parent() {
        if parent.file_name().unwrap_or_default() == "common" {
            is_steam = true;
        }
    }
    let mut command;
    if is_steam {
        command = Command::new(get_steam_exe_path().unwrap());
        args.push("-applaunch 945360".to_string());
    }
    else {
        command = Command::new(config.game_config.exe_path());
        let id_path = config.game_config.dir_path.join("steam_appid.txt");
        if !id_path.exists() {
            fs::write(id_path, "945360").expect("Failed to write steam_appid.txt");
        }
    }

    if moded && !winhttp_path.exists() {
        let doorstop_path = get_doorstop_path(&app);
        if doorstop_path.exists() {
            // 复制文件
            fs::copy(doorstop_path, config.game_config.dir_path.join("winhttp.dll"))
                .expect("Failed to copy winhttp.dll");
        }
    }

    args.push("--doorstop-enabled".to_string());
    args.push(moded.to_string());

    command.args(args);

    command
}

#[tauri::command]
pub fn get_lang(config: StateMutex<ManagerConfig>) -> String {
    config.lock().unwrap().lang.clone()
}

#[tauri::command]
pub fn has_exe(config: StateMutex<ManagerConfig>) -> bool {
    config.lock().unwrap().game_config.exe_path().exists()
}
