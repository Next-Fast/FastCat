use std::{fmt::format, fs, io, process::Command};
use serde::de::value;
use tauri::{ AppHandle};
use tauri_plugin_fs::Fs;

use crate::utils::{pathget::{get_LocalLow_path, get_bepinex_dir, get_doorstop_path, get_dotnet_dir, get_steam_exe_path}, StateMutex};

use super::{GameConfig, ManagerConfig};

#[tauri::command]
pub fn get_config(config: StateMutex<ManagerConfig>) -> ManagerConfig {
    config.lock().unwrap().clone()
}

#[tauri::command]
pub fn set_config(
    lang: String,
    game: Option<GameConfig>,
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

    local.save(&app);
}

#[tauri::command]
pub fn set_proxy(name : String, url : String, config: StateMutex<ManagerConfig>, app: AppHandle) {
    let mut local = config.lock().unwrap();
    let set_url;
    if url != "" {
        set_url = url + "/";
    }
    else {
        set_url = "".to_string();
    }

    local.set_proxy(name);
    local.set_proxy_url(set_url);
    local.save(&app);
}

#[tauri::command]
pub fn has_bepinex(config: StateMutex<ManagerConfig>) -> bool {
    config.lock().unwrap().game_config.has_bepinex()
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

    args.push(format!("--doorstop-enabled {}", moded));

    let target_assembly_path = get_bepinex_dir(&app).join("core/BepInEx.Unity.IL2CPP.dll").to_str().unwrap().to_string();
    args.push(format!("--doorstop-target-assembly {}", target_assembly_path));
    
    let clr_dir = get_dotnet_dir(&app);
    args.push(format!("--doorstop-clr-corlib-dir {}", clr_dir.to_str().unwrap().to_string()));

    let clr_path = clr_dir.join("coreclr.dll");
    args.push(format!("--doorstop-clr-runtime-coreclr-path {}", clr_path.to_str().unwrap().to_string()));

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

#[tauri::command]
pub fn bep_in_ex_version(config: StateMutex<ManagerConfig>) -> String {
    config.lock().unwrap().game_config.BepInEx_Version()
}
