use std::sync::Mutex;

use tauri::{AppHandle, Manager};

pub mod commands;

pub fn steup(app: &AppHandle) -> eyre::Result<()> {
    let manager = ModManager::new();

    app.manage(Mutex::new(manager));
    Ok(())
}

impl ModManager {
    fn new() -> Self {
        Self { }
    }
}

pub struct ModManager {
    
}