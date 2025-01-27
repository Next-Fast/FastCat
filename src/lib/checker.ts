import {  BaseDirectory} from "@tauri-apps/api/path";
import { getProxyUrl } from "./constant/github-proxy";
import { bepinex_url, mods_url, version_url } from "./constant/url-constant";
import { exists, copyFile, writeTextFile, CopyFileOptions, ExistsOptions, WriteFileOptions } from "@tauri-apps/plugin-fs";
import { InfoVersion } from "./Types";
import { Is_Dev } from "@/AppEnv";
import { get_github_version, get_local_version } from "./constant/tauri-constant";

let has_file = false;
async function check_data() {
    var option : ExistsOptions = {
        baseDir: BaseDirectory.AppData
    }
    has_file = 
    await exists("version.json", option) 
    && 
    await exists("Mods.json", option) 
    && 
    await exists("Bepinex.json", option);
}

export async function start_async()
{
    await check_data();

    if (!has_file)
        await CopyFile();

    var localVersion = await get_local_version();
    var url = getProxyUrl(version_url);
    var githubVersion = await get_github_version(url);

    if (!localVersion || !githubVersion)
    {
        console.log("获取版本信息失败");
        return;
    }

    console.log(`localVersion.BepInEx: ${localVersion.BepInEx}, githubVersion.BepInEx: ${githubVersion.BepInEx}`);
    console.log(`localVersion.Mods: ${localVersion.Mods}, githubVersion.Mods: ${githubVersion.Mods}`);

    if (localVersion.BepInEx < githubVersion.BepInEx)
        Update_BepInEx();

    if (localVersion.Mods < githubVersion.Mods)
        Update_Mods();

    await WriteVersion(githubVersion);

    console.log("检查更新成功");
}

const writeOption : WriteFileOptions = {
    baseDir: BaseDirectory.AppData
}

export const WriteVersion = async (version : InfoVersion) =>
    await writeTextFile("version.json", JSON.stringify(version), writeOption);

async function Update_BepInEx()
{
    var response = await fetch(getProxyUrl(bepinex_url))
    var data = await response.text();
    await writeTextFile("Bepinex.json", data, writeOption);
    console.log("更新BepInEx成功");
}

async function Update_Mods()
{
    var response = await fetch(getProxyUrl(mods_url))
    var data = await response.text();
    await writeTextFile("Mods.json", data, writeOption);
    console.log("更新Mods成功");
}

async function CopyFile()
{
    var option : CopyFileOptions = {
        fromPathBaseDir: BaseDirectory.Resource,
        toPathBaseDir: BaseDirectory.AppData
    }
    var PreFix = Is_Dev ? "_up_/Resource/" : "";
    await copyFile(PreFix + "Json/version.json", "version.json", option);
    await copyFile(PreFix + "Json/Mods.json", "Mods.json", option);
    await copyFile(PreFix + "Json/Bepinex.json", "Bepinex.json", option);
    console.log("复制文件成功");
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