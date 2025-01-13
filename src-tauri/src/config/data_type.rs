use serde::{Deserialize, Serialize};

struct BepInExInfo {
    version: String,
    is_release: bool,
    build_id: Option<String>,
    build_hash: Option<String>,
}

struct ModInfo {
    name: String,
    versions: Vec<String>,
    description: String,
    author: String,
    languages: Vec<String>,
    dependencies: Option<Vec<DependencyInfo>>,
    loader: String,
    download_source: String,
    download_link: Option<String>,
    markdown_path: Option<String>,
}

struct DependencyInfo {
    name: String,
    version: String,
}

#[derive(Serialize, Deserialize)]
struct Config {
    #[serde(rename = "BepInEx")]
    bep_in_ex: u8,
    
    #[serde(rename = "Mods")]
    mods: u8,
}
