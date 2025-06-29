import useSWR, { SWRConfiguration } from 'swr'
import { bep_in_ex_version, get_announcement_latest, get_config, get_region_config, has_bepinex } from '../constant/tauri-constant'

export const FileConfig: SWRConfiguration = {}

export const useGetConfig = () => {
    return useSWR('/tauri/get_config', get_config,
    {
        ...FileConfig,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 5,
    })
}

export const useHasBepInEx = () => {
    return useSWR('/tauri/has_bepinex', has_bepinex,
    {
        ...FileConfig,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 5,
    })
}

export const useBepInExVersion = () => {
    return useSWR('/tauri/bep_in_ex_version', bep_in_ex_version,
    {
        ...FileConfig,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 5,
    })
}

export const useRegionConfig = () => {
    return useSWR('/tauri/get_region_config', get_region_config,
        {
            ...FileConfig,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            refreshInterval: 5,
        }
    )
}

export const useAnnouncementLatest = () => {
    return useSWR('/tauri/announcement_latest', get_announcement_latest, {
        ...FileConfig,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 0,
        dedupingInterval: Infinity,
        revalidateIfStale: false
    })
}
