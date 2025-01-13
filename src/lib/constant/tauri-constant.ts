import { invoke } from "@tauri-apps/api/core"
import { GameConfig, ManagerConfig, SuprrortLanguage } from "../Types"

export const set_config = async (_lang : SuprrortLanguage, _game : GameConfig) => {
    await invoke("set_config", { lang : _lang, game : _game});
}

export const get_config = async () => {
    return await invoke<ManagerConfig>("get_config");
}

export const has_bepinex = async () => {
    return await invoke<boolean>("has_bepinex");
}

export const region_config_path = async () => {
    return await invoke<string>("region_config_path");
}

export const launch_game = async (vailld : boolean) => {
    await invoke("launch_game", { vanild : vailld });
}

export const get_language = async () => {
    return await invoke<SuprrortLanguage>("get_language");
}