import { GameConfig, InfoVersion, ManagerConfig, SuprrortLanguage } from "../Types"
import { Invoke_Command } from "../utils";

export const set_config = async (
    _lang : SuprrortLanguage | undefined = undefined, 
    _game : GameConfig | undefined = undefined,
    _proxy : string | undefined = undefined
) => {
    var set_lang = _lang ? _lang : "";
    await Invoke_Command("set_config", { lang : set_lang, game : _game, proxy : _proxy });
}

export const get_config = async () => {
    return await Invoke_Command<ManagerConfig>("get_config");
}

export const has_bepinex = async () => {
    return await Invoke_Command<boolean>("has_bepinex");
}

export const region_config_path = async () => {
    return await Invoke_Command<string>("region_config_path");
}

export const launch_game = async (is_Moded : boolean) => {
    await Invoke_Command("launch_game", { moded: is_Moded });
}

export const get_language = async () => {
    return await Invoke_Command<SuprrortLanguage>("get_lang");
}

export const open_dir = async (path : string) => {
    await Invoke_Command("open_dir", { path_str : path });
}

export const get_info_version = async (url : string) => {
    return await Invoke_Command<InfoVersion>("get_info_version", { url_str : url });
}

export const get_local_info_version = async () => {
    return await Invoke_Command<InfoVersion>("get_local_info_version");
}

export const get_ping_latest = async (all : string[]) => {
    all = all.map(item => item.replace("https://", ""));
    var latest = await Invoke_Command<string>("get_ping_latest", { urls: all });
    return "https://" + latest;
}