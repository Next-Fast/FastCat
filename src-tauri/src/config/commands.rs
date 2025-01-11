use crate::utils::StateMutex;

use super::ManagerConfig;

#[tauri::command]
pub fn get_config(config: StateMutex<ManagerConfig>) -> ManagerConfig {
    config.lock().unwrap().clone()
}

#[tauri::command]
pub fn set_config(value: ManagerConfig, config: StateMutex<ManagerConfig>) {
    *config.lock().unwrap() = value;
}
