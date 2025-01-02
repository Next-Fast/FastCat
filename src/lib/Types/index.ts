export * from "./config"
export * from "./data"

export enum ManagerMode {
    SingleVersion = "single",
    MutlingVersion = "mutling",
    NoSet = "no",
}

export enum StorePlatrom {
    Epic = "epic",
    Steam = "steam",
    Itch = "itch",
    Microsoft = "microsoft"
}

export enum LoaderType {
    NextBepLoader = "nextBepLoader",
    BepInEx = "bepInEx",
}

export enum ModDownloadSource {
    Github = "github",
    NekoLibrary = "nekolibrary",
    Thunderstore = "thunderstore",
}

export type SuprrortLanguage = 'en' | 'zh';