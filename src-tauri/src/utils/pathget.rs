use std::path::PathBuf;
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

pub fn get_game_path() -> Result<PathBuf> {
    let steam_path = get_steam_path()?;
    let game_path = steam_path.join("steamapps/common/Among Us");
    if game_path.exists() {
        return Ok(game_path);
    }

    return Ok(PathBuf::new());
}

pub fn get_LocalLow_path() -> PathBuf {
    dirs::home_dir().unwrap().join("AppData/LocalLow/Innersloth/Among Us")
}