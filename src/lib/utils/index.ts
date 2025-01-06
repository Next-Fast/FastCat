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