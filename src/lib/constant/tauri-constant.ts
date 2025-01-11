import { invoke } from "@tauri-apps/api/core"
import { ManagerConfig } from "../Types"

export const set_config = async (config : ManagerConfig) => {
    await invoke("set_config", {config});
}

export const get_config = async () => {
    return await invoke<ManagerConfig>("get_config");
}