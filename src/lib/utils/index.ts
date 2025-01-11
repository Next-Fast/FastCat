export * from './shacn-utils'
export * from './route-utils'
export { Invoke_Command, Invoke_Deault, Invoke } from './tarui-utlis'
export type { Tauri_Command } from './tarui-utlis'

/**
 * @param org
 * @param replacements
 * @returns
 * <key> -> value
 * 
 * replace('<key>', { key: 'value' }) -> 'value'
**/
export function replace(org: string, replacements: { [key: string]: string | undefined }): string {
    return org.replace(/<(\w+)>/g, (_, key) => replacements[key] || key);
}

interface IVersion {
    major: number,
    minor: number,
    patch: number
}

/**
 * parse version string to version object
 * @param version
 * @returns
 * { major: number, minor: number, patch: number }
 * */
export function parseVersion(version: string): IVersion {
    const parts = version.split('.');
    return {
        major: parseInt(parts[0] || '0'),
        minor: parseInt(parts[1] || '0'),
        patch: parseInt(parts[2] || '0')
    }
}

/**
 * parse version string to version object array
 * @param version
 * @returns
 * [{ major: number, minor: number, patch: number }]
 * */
export function toVersions(version: string[], sort : boolean = false) : IVersion[]
{
    var versions = version.map(v => parseVersion(v));
    if (sort) {
        versions.sort((a, b) => {

            if (a.major != b.major)
                return a.major - b.major;

            if (a.minor != b.minor)
                return a.minor - b.minor;

            if (a.patch != b.patch) 
                return a.patch - b.patch;
            return 0;
        })
    }
    return versions
}

/**
 * compare version
 * @param version1
 * @param version2
 * @returns
 * 1: version1 > version2
 * -1: version1 < version2
 * 0: version1 = version2
 * */
export function compare(version1: string, version2: string) : number
{
    var v1s = version1.split('.');
    var v2s = version2.split('.');

    for (let i = 0; i < Math.max(v1s.length, v2s.length); i++) {
        var v1 = parseInt(v1s[i] || '0');
        var v2 = parseInt(v2s[i] || '0');
        if (v1 > v2) return 1;
        if (v1 < v2) return -1;
    }

    return 0;
}