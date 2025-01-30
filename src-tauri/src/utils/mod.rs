use std::sync::Mutex;

use serde::{Deserialize, Serialize};

pub mod commands;
pub mod file;
pub mod pathget;

pub type StateMutex<'r, S> = tauri::State<'r, Mutex<S>>;

#[derive(Serialize, Deserialize)]
pub struct InfoVersion{
    #[serde(rename = "BepInEx")]
    pub bepinex: i32,
    #[serde(rename = "Mods")]
    pub mods: i32,
    #[serde(rename = "Hash")]
    pub hash: i32
}
