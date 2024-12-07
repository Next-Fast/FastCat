import { invoke, InvokeArgs, InvokeOptions } from "@tauri-apps/api/core";
import { Is_Tauri } from "../../AppEnv";

type Tauri_Command = "greet" | "Get";

export async function Invoke_Command<T>(command : Tauri_Command, args? : InvokeArgs, options? : InvokeOptions) : Promise<T | undefined>
{
    if (!Is_Tauri)
        return undefined;

    return await invoke<T>(command as string, args, options)
}

export async function Invoke_Deault<T>(command: Tauri_Command, defaultValue : T, args?: InvokeArgs, options?: InvokeOptions) : Promise<T>
{
    return await Invoke_Command<T>(command, args, options) ?? defaultValue;
}