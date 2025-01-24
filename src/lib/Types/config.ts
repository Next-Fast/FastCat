import { LoaderType, SuprrortLanguage } from "."

export type ManagerConfig = {
    lang : SuprrortLanguage,
    GameConfig: GameConfig,
    GithubProxy: string
}

export type GameConfig = {
    Loader: LoaderType,
    DirPath: string,
}


