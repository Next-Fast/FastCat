import { LoaderType, ModDownloadSource, StorePlatrom, SuprrortLanguage } from ".";

export interface ModInfo {
    Name: string;
    Versions: string[];
    Description: string;
    Author: string;
    Languages: SuprrortLanguage[] | SuprrortLanguage;
    Dependencies?: DependencyInfo[];
    Loader: LoaderType;
    DownloadSource: ModDownloadSource | [];
    DownloadLink?: string;
    MarkdownPath?: string;
    imagePath?: string;
}

export interface AssemblyHash {
    Platform: StorePlatrom;
    Version: string;
    Hash: string;
}

export interface DependencyInfo {
    Name: string;
    Version: string;
}

export interface BepInExInfo {
    Version: string,
    IsRelease: boolean,
    BuildId?: string,
    BuildHash?: string,
}

export interface InfoVersion
{
    BepInEx: number,
    Mods: number,
    Hash: number,
}

export class DefaultBepInExInfo implements BepInExInfo {
    Version: string = "6.0.0";
    IsRelease: boolean = false;
    BuildId?: string | undefined;
    BuildHash?: string | undefined;
}

export interface AnnouncementResponse {
    has_new: boolean,
    announcement: string,
}
