mod config;
mod utils;

use tauri::AppHandle;

fn steup(app: &AppHandle) {
    config::steup(app);
    return;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            config::commands::get_config,
            config::commands::set_config,
            config::commands::has_bepinex,
            config::commands::region_config_path,
            config::commands::launch_game,
            config::commands::get_lang,
            utils::commands::open_dir,
            utils::commands::get_info_version,
            utils::commands::get_local_info_version
        ])
        .setup(|app| {
            let handle = app.handle().clone();
            steup(&handle);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
