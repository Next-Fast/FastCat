mod config;
mod utils;
mod modmanager;

use eyre::Context;
use tauri::AppHandle;

fn steup(app: &AppHandle) {
    config::steup(app).context("Failed to setup config").unwrap();
    modmanager::steup(app).context("Failed to setup modmanager").unwrap();
    utils::deeplink::setup(app).context("Failed to setup deeplink").unwrap();
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
            config::commands::set_proxy,
            config::commands::has_bepinex,
            config::commands::launch_game,
            config::commands::get_lang,
            config::commands::has_exe,
            config::commands::bep_in_ex_version,
            utils::commands::open_dir,
            utils::commands::get_github_version,
            utils::commands::get_local_version,
            utils::commands::get_ping_latest,
            utils::commands::download_bepinex,
            utils::commands::get_announcement_latest,
            utils::commands::get_region_config,
            utils::commands::set_region_config
        ])
        .setup(|app| {
            let handle = app.handle().clone();
            steup(&handle);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
