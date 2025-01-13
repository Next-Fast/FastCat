import { GameConfig, ManagerConfig, SuprrortLanguage } from "../Types"
import { Invoke_Command } from "../utils";

export const set_config = async (_lang : SuprrortLanguage, _game : GameConfig) => {
    await Invoke_Command("set_config", { lang : _lang, game : _game});
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

export const launch_game = async (vailld : boolean) => {
    await Invoke_Command("launch_game", { vanild : vailld });
}

export const get_language = async () => {
    return await Invoke_Command<SuprrortLanguage>("get_lang");
}

export const open_dir = async (path : string) => {
    await Invoke_Command("open_dir", { path_str : path });
}