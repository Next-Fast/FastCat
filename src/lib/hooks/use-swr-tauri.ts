import useSWR, { SWRConfiguration } from 'swr'
import { get_config } from '../constant/tauri-constant'

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