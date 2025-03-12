use tauri::{AppHandle, Listener};

pub fn setup(app : &AppHandle) -> eyre::Result<()>{
    app.listen("neko://install", | url| {

    });

    app.listen("neko://uninstall", | url| {

    });


    app.listen("neko://update", | url| {
        
    });

    app.listen("neko://disable", | url| {
        
    });

    app.listen("neko://enable", | url| {
        
    });

    Ok(())
}