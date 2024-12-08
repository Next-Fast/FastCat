import { isTauri } from "@tauri-apps/api/core";
import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';

/// Deault Tarui log Dir
/// Liunx {configDir}/{bundleIdentifier} /home/#UserName/.config/cat.fast.next
/// macOS {homeDir}/Library/Logs/{bundleIdentifier} /Users/#UserName/Library/Logs/cat.fast.next
/// Windows {FOLDERID_LocalAppData}/{bundleIdentifier}/logs C:\Users\#UserName\AppData\Local\com.tauri.dev\cat.fast.next

// Forward console logs to Tauri logger
if (isTauri())
{
    function forwardConsole(
        fnName: 'log' | 'debug' | 'info' | 'warn' | 'error',
        logger: (message: string) => Promise<void>
    ) {
        const original = console[fnName];
        console[fnName] = (message) => {
            original(message);
            logger(message);
        };
    }

    forwardConsole('log', trace);
    forwardConsole('debug', debug);
    forwardConsole('info', info);
    forwardConsole('warn', warn);
    forwardConsole('error', error);
}