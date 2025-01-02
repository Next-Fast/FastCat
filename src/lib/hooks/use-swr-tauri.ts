import useSWR, { SWRConfiguration } from 'swr'
import { isFirst } from '../constant/tauri-constant'

export const FileConfig: SWRConfiguration = {}

export const useIsFirst = () => {
    return useSWR<boolean>('/tauri/is_first', isFirst, {
        ...FileConfig,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 0,
    })
}
