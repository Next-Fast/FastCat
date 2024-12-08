import { LoaderType, SuprrortLanguage } from "."

export type ManagerConfig = {
    lang : SuprrortLanguage,
}

export type GameConfig = {
    LoaderVersion: string,
    Loader: LoaderType
    Version: string,
    DirPath: string,
}


