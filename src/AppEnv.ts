export const Is_Dev : boolean = import.meta.env.IS_DEV;
export const Is_Tauri : boolean = (import.meta.env.IS_TAURI ?? false) || isTauri();
export const Vite_MODE : string = import.meta.env.MODE;
export const Vite_BASE_URL : string = import.meta.env.BASE_URL;
export const Vite_DEV : boolean = import.meta.env.DEV;
export const Vite_PROD : boolean = import.meta.env.PROD;
export const Vite_SSR : boolean = import.meta.env.SSR;

import { isTauri } from "@tauri-apps/api/core";
import { 
    arch, 
    Arch, 
    exeExtension, 
    eol, 
    version,
    locale,
    type,
    OsType
} from "@tauri-apps/plugin-os";


export let Tauri_OS : OsType | undefined = undefined;
export let Tauri_Arch : Arch | undefined = undefined;
export let Tauri_Extension : string | undefined = undefined;
export let Tauri_End : string | undefined = undefined;
export let Tauri_OsVersion : string | undefined = undefined;
export let Tauri_Locale : string | null | undefined = undefined;

if (Is_Tauri) {
    Tauri_OS = type();
    Tauri_Arch = arch();
    Tauri_Extension = exeExtension();
    Tauri_End = eol();
    Tauri_OsVersion = version();
    Tauri_Locale = await locale();
}

LogEnvInfo();
export function LogEnvInfo() {
    console.log(`Is_Dev: ${Is_Dev}`);
    console.log(`Is_Tauri: ${Is_Tauri}`);
    console.log(`Vite_MODE: ${Vite_MODE}`);
    console.log(`Vite_BASE_URL: ${Vite_BASE_URL}`);
    console.log(`Vite_DEV: ${Vite_DEV}`);
    console.log(`Vite_PROD: ${Vite_PROD}`);
    console.log(`Vite_SSR: ${Vite_SSR}`);


    if (Is_Tauri) {
        console.log(`Tauri_Platform: ${Tauri_OS}`);
        console.log(`Tauri_Arch: ${Tauri_Arch}`);
        console.log(`Tauri_Extension: ${Tauri_Extension}`);
        console.log(`Tauri_End: ${Tauri_End}`);
        console.log(`Tauri_OsVersion: ${Tauri_OsVersion}`);
        console.log(`Tauri_Locale: ${Tauri_Locale}`);
    }
}
