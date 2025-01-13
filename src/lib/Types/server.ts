export interface Server {
    Name: string;
    Ip: string;
    Port: number;
    UseDtls: boolean;
    Players: number;
    ConnectionFailures: number;
}

export interface RegionInfo {
    $type: string;
    Name: string;
    PingServer: string;
    Servers: Server[];
    TargetServer: null | string;
    TranslateName: number;
}

export interface RegionConfig {
    CurrentRegionIdx: number;
    Regions: RegionInfo[];
}