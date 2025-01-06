import { LoaderType, ModDownloadSource, SuprrortLanguage } from ".";

export interface ModInfo {
    Name: string;
    LatestVersion: string;
    Versions: string[];
    Description: string;
    Author: string;
    Languages: SuprrortLanguage[] | SuprrortLanguage;
    Dependencies?: DependencyInfo[];
    Loader: LoaderType;
    DownloadSource: ModDownloadSource;
    DownloadLink?: string;
    MarkdownPath?: string;
}

export interface DependencyInfo {
    Name: string;
    Version: string;
    IsMod: boolean;

    TargetVersions?: string[];
}

export interface BepInExInfo {
    Version: string,
    IsRelease: boolean,
    BuildId?: string,
    BuildHash?: string,
}

export class DefaultBepInExInfo implements BepInExInfo {
    Version: string = "6.0.0";
    IsRelease: boolean = false;
    BuildId?: string | undefined;
    BuildHash?: string | undefined;
}