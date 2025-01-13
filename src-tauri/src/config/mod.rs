use std::{fs, path::PathBuf, sync::Mutex};

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};

use crate::utils::{
    file::{read_json, write_json},
    pathget::get_game_path,
};

pub mod commands;
pub mod data_type;

pub fn steup(app: &AppHandle) {
    let config = ManagerConfig::create(app);

    app.manage(Mutex::new(config));
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ManagerConfig {
    lang: String,
    #[serde(rename = "GameConfig")]
    game_config: GameConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameConfig {
    #[serde(rename = "DirPath")]
    dir_path: PathBuf,
    #[serde(rename = "Loader")]
    loader: LoaderType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum LoaderType {
    NextBepLoader,
    BepInEx,
}

impl ManagerConfig {
    fn new() -> Self {
        Self {
            lang: "en".to_string(),
            game_config: GameConfig::new(),
        }
    }

    fn create(app: &AppHandle) -> Self {
        let config_path = app.path().app_config_dir().unwrap().join("config.json");
        fs::create_dir_all(config_path.parent().unwrap())
            .expect("Failed to create config.json directory");

        if !config_path.exists() {
            let value = Self::new();
            write_json(config_path, &value).expect("Failed to write config.json");
            return value;
        } else {
            let value = read_json(config_path).expect("Failed to read config.json");
            return value;
        }
    }

    pub fn set(&mut self, set_lang: String, game: GameConfig) {
        self.lang = set_lang;
        self.game_config = game;
    }

    pub fn save(&self, app: &AppHandle) {
        let config_path = app.path().app_config_dir().unwrap().join("config.json");
        fs::create_dir_all(config_path.parent().unwrap())
            .expect("Failed to create config.json directory");

        write_json(config_path, &self).expect("Failed to write config.json");
    }
}

impl GameConfig {
    fn new() -> Self {
        Self {
            dir_path: get_game_path().unwrap(),
            loader: LoaderType::BepInEx,
        }
    }

    pub fn has_bepinex(&mut self) -> bool {
        let path = self.bep_in_ex_path();

        path.exists()
    }

    pub fn exe_path(&mut self) -> PathBuf {
        let mut path = self.dir_path.clone();
        path.push("Among Us.exe");

        path
    }

    pub fn bep_in_ex_path(&mut self) -> PathBuf {
        let mut path = self.dir_path.clone();
        path.push("BepInEx");

        path
    }

    pub fn plugin_dir(&mut self) -> PathBuf {
        let mut path = self.bep_in_ex_path();
        path.push("plugins");

        path
    }
}
