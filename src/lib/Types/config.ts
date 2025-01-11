import { LoaderType, SuprrortLanguage } from "."

export type ManagerConfig = {
    lang : SuprrortLanguage,
    GameConfig: GameConfig,
}

export type GameConfig = {
    Loader: LoaderType,
    DirPath: string,
}


