import { appDataDir, resolve, resolveResource } from "@tauri-apps/api/path";
import { getProxyUrl } from "./constant/github-proxy";
import { get_info_version, get_local_info_version } from "./constant/tauri-constant";
import { bepinex_url, mods_url, version_url } from "./constant/url-constant";
import { exists, copyFile, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";

let has_file = false;
async function check_data() {
    has_file = 
    await exists(await get_data_path("version.json")) 
    && 
    await exists(await get_data_path("Mods.json")) 
    && 
    await exists(await get_data_path("Bepinex.json"));
}

export const get_data_path = async (file : string) => resolve(await appDataDir(), "ModList", file);
export const get_resource_path = async (file : string) => resolveResource(file);

export async function start_async()
{
    await mkdir(await resolve(await appDataDir(), "ModList"));
    await check_data();

    var localVersion = await get_local_info_version();
    var githubVersion = await get_info_version(getProxyUrl(version_url));
    if (!has_file && localVersion && githubVersion)
    {
        if (githubVersion.BepInEx > localVersion.BepInEx || githubVersion.Mods > localVersion.Mods)
        {
            await Update_BepInEx();
            await Update_Mods();
            await writeTextFile(await get_data_path("version.json"), JSON.stringify(githubVersion));
        }
        else
        {
            await CopyFile();
        }

        return;
    }

    if (!localVersion || !githubVersion)
    {
        console.log("获取版本信息失败");
        return;
    }

    if (localVersion.BepInEx < githubVersion.BepInEx)
        Update_BepInEx();

    if (localVersion.Mods < githubVersion.Mods)
        Update_Mods();

    writeTextFile(await get_data_path("version.json"), JSON.stringify(githubVersion));
}

async function Update_BepInEx()
{
    var response = await fetch(getProxyUrl(bepinex_url))
    var data = await response.text();
    writeTextFile(await get_data_path("Bepinex.json"), data);
}

async function Update_Mods()
{
    var response = await fetch(getProxyUrl(mods_url))
    var data = await response.text();
    writeTextFile(await get_data_path("Mods.json"), data);
}

async function CopyFile()
{
    copyFile(await get_resource_path("Json/version.json"), await get_data_path("version.json"));
    copyFile(await get_resource_path("Json/Mods.json"), await get_data_path("Mods.json"));
    copyFile(await get_resource_path("Json/Bepinex.json"), await get_data_path("Bepinex.json"));
}

export function start() {
    try 
    {
        start_async();
    }
    catch (error)
    {
        console.log(error);
    }
}