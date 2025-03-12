import { get_config, set_config } from "./tauri-constant";

// get from https://github.akams.cn/
export const ALL_PROXY_URL : { name: string, url: string | undefined }[] = [
    { name: 'github.com', url: undefined },
    { name: 'moeyy.xyz', url: 'https://github.moeyy.xyz'},
    { name: 'llkk.cc', url: 'https://gh.llkk.cc'},
    { name: 'ghproxy.cn', url: 'https://ghproxy.cn'},
    { name: 'ghproxy.net', url: 'https://ghproxy.net'},
    { name: 'gitproxy.click', url: 'https://gitproxy.click'}
]

export async function set_proxy(name: string) {
    PROXY = ALL_PROXY_URL.find(item => item.name == name) || PROXY;
    await set_config(undefined, undefined, name);
}

export let PROXY = ALL_PROXY_URL.find(async item => item.name == (await get_config())?.GithubProxy) || ALL_PROXY_URL[0];
export function getProxyUrl(url : string)
{
    if (!url.startsWith('https://github.com') && !url.startsWith('https://raw.githubusercontent.com'))
        return url;

    if (!PROXY.url)
        return url;

    return `${PROXY.url}/${url}`;
}