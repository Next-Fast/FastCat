use std::process::Command;
use tauri::AppHandle;

use crate::utils::{pathget::get_LocalLow_path, StateMutex};

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
    moded: bool,
    lock_config: StateMutex<'a, ManagerConfig>,
) -> Result<(), String> {
    let mut config = lock_config.lock().unwrap();
    let exe_path = config.game_config.exe_path();
    let mut command = Command::new(exe_path);
    let mut winhttp_path = config.game_config.dir_path.clone();
    winhttp_path.push("winhttp.dll");

    if winhttp_path.exists() {
        command.args(["--doorstop-enabled", &moded.to_string()]);
    }

    command.spawn().expect("Failed to launch game");
    Ok(())
}

#[tauri::command]
pub fn get_lang(config: StateMutex<ManagerConfig>) -> String {
    config.lock().unwrap().lang.clone()
}

#[tauri::command]
pub fn has_exe(config: StateMutex<ManagerConfig>) -> bool {
    config.lock().unwrap().game_config.exe_path().exists()
}
