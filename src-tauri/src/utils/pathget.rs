use std::path::PathBuf;

use tauri::{path::BaseDirectory, AppHandle, Manager};
use windows_registry::*;

pub fn get_steam_path() -> Result<PathBuf> {
    let default_path = PathBuf::from("C:/Program Files (x86)/Steam/");
    if default_path.exists() {
        return Ok(default_path);
    }

    let steam_key = LOCAL_MACHINE.open(r"SOFTWARE\WOW6432Node\Valve\Steam")?;
    let path = steam_key.get_string("InstallPath")?;
    return Ok(PathBuf::from(path));
}

pub fn get_steam_exe_path() -> Result<PathBuf> {
    let steam_path = get_steam_path()?;
    let steam_exe_path = steam_path.join("steam.exe");
    if steam_exe_path.exists() {
        return Ok(steam_exe_path);
    }

    return Ok(PathBuf::new());
}

pub fn get_game_path() -> Result<PathBuf> {
    let steam_path = get_steam_path()?;
    let game_path = steam_path.join("steamapps/common/Among Us");
    if game_path.exists() {
        // 将路径分隔符从 \\ 替换为 /
        let game_path_str = game_path.to_str().unwrap().replace("\\", "/");
        let game_path = PathBuf::from(game_path_str);
        return Ok(game_path);
    }

    return Ok(PathBuf::new());
}

pub fn get_bepinex_dir(app : &AppHandle) -> PathBuf {
    let path = app
        .path()
        .resolve("AllBepInEx", BaseDirectory::AppData)
        .unwrap();

    path
}

pub fn get_dotnet_dir(app : &AppHandle) -> PathBuf {
    let path = app
        .path()
        .resolve("AllDotnet", BaseDirectory::AppData)
        .unwrap();

    path
}

pub fn get_bepinex_dotnet_dir(app : &AppHandle) -> PathBuf {
    get_dotnet_dir(app).join("BepInEx")
}

pub fn get_doorstop_path(app : &AppHandle) -> PathBuf {
    get_bepinex_dir(app).join("winhttp.dll")
}

pub fn get_mods_dir(app : &AppHandle) -> PathBuf {
    let path = app
        .path()
        .resolve("AllMods", BaseDirectory::AppData)
        .unwrap();

    path
}

#[allow(non_snake_case)]
pub fn get_LocalLow_path() -> PathBuf {
    dirs::home_dir()
        .unwrap()
        .join("AppData/LocalLow/Innersloth/Among Us")
}
