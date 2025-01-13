use std::path::PathBuf;

#[tauri::command]
pub fn open_dir(path_str: String) {
    let path = PathBuf::from(path_str);
    if path.exists() {
        open::that(path).expect("Failed to open directory");
    }
}