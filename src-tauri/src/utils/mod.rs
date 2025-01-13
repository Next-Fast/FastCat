use std::sync::Mutex;

pub mod file;
pub mod pathget;
pub mod commands;

pub type StateMutex<'r, S> = tauri::State<'r, Mutex<S>>;

