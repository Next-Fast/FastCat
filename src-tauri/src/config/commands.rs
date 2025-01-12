use crate::utils::StateMutex;

use super::{GameConfig, ManagerConfig};

#[tauri::command]
pub fn get_config(config: StateMutex<ManagerConfig>) -> ManagerConfig {
    config.lock().unwrap().clone()
}

#[tauri::command]
pub fn set_config(lang : String, game : GameConfig, config: StateMutex<ManagerConfig>) {
    let mut local  = config.lock().unwrap();
    local.set(lang, game);
}
