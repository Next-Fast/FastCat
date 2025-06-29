import { AnnouncementResponse, GameConfig, InfoVersion, ManagerConfig, SuprrortLanguage } from "../Types"
import { Invoke_Command } from "../utils";

export const set_config = async (
    _lang : SuprrortLanguage | undefined = undefined, 
    _game : GameConfig | undefined = undefined
) => {
    var set_lang = _lang ? _lang : "";
    await Invoke_Command("set_config", { lang : set_lang, game : _game });
}

export const set_proxy = async (_name : string, _proxy : string) => {
    await Invoke_Command("set_proxy", { name : _name, proxy : _proxy });
}

export const get_config = async () => {
    return await Invoke_Command<ManagerConfig>("get_config");
}

export const has_bepinex = async () => {
    return await Invoke_Command<boolean>("has_bepinex");
}

export const launch_game = async (is_Moded : boolean) => {
    await Invoke_Command("launch_game", { moded: is_Moded });
}

export const get_language = async () => {
    return await Invoke_Command<SuprrortLanguage>("get_lang");
}

export const open_dir = async (path : string) => {
    await Invoke_Command("open_dir", { pathStr : path });
}

export const get_github_version = async (url : string) => {
    return await Invoke_Command<InfoVersion>("get_github_version", { urlStr : url });
}

export const get_local_version = async () => {
    return await Invoke_Command<InfoVersion>("get_local_version");
}

export const get_ping_latest = async (all : string[]) => {
    all = all.map(item => item.replace("https://", ""));
    var latest = await Invoke_Command<string>("get_ping_latest", { urls: all });
    return "https://" + latest;
}

export const download_bepinex = async (Version : string, Release : boolean, Hash : string) => {
    await Invoke_Command("download_bepinex", { version : Version, is_release : Release, hash : Hash });
}

export const bep_in_ex_version = async () => {
    return await Invoke_Command<string>("bep_in_ex_version");
}

export const get_announcement_latest = async () => {
    return await Invoke_Command<AnnouncementResponse>("get_announcement_latest");
}

export const get_region_config = async () => {
    return await Invoke_Command<string>("get_region_config");
}

export const set_region_config = async (config: string) => {
    await Invoke_Command("set_region_config", { content : config });
}