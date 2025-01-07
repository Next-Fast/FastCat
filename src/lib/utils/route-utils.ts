import { Vite_PROD } from '@/AppEnv';
import React, { FC }  from 'react';

export const TanStackRouterDevtools =
        Vite_PROD
        ? () => null // Render nothing in production
        : React.lazy(() =>
            // Lazy load in development
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
                // For Embedded Mode
                // default: res.TanStackRouterDevtoolsPanel
            })),
        )

/* interface elementMap {
    element: FC;
    paths: string[];
}

export interface RegisterInfo {
    path: string;
    layout?: FC;
    extesions?: FC[];
}

export const LayoutPaths: elementMap[] = [

];

export const ExtesionsPaths: elementMap[] = []

const allRegisterInfo: RegisterInfo[] = []

export function RegisterPathUse(path : string, layout: FC, extesions : FC[] | undefined) 
{
    let info = allRegisterInfo.find((item) => item.path === path);
    let hasRegister = true;
    if (!info) {
        hasRegister = false;
        info = { path: path, layout: layout, extesions: extesions };
        allRegisterInfo.push(info);
    }

    if (info.layout && layout) {
        if (hasRegister && info.layout !== layout) {
            unRegister(LayoutPaths, path, info.layout);
            info.layout = layout;
        }
        register(LayoutPaths, path, layout);
    }

    if (info.extesions && extesions) {
        if (hasRegister && info.extesions !== extesions) {
            info.extesions.filter(map => !extesions?.includes(map)).forEach((item) => {
                unRegister(ExtesionsPaths, path, item);
            });
            info.extesions = extesions;
        }

        info.extesions.forEach((item) => {
            register(ExtesionsPaths, path, item);
        })
    }
}

function unRegister(maps : elementMap[], path : string, element : FC) {
    let map = maps.find((item) => item.element === element);
    if (map) {
        map.paths = map.paths.filter((item) => item !== path);
    }
}

function register(maps : elementMap[], path : string, element : FC) {
    let map = maps.find((item) => item.element === element);
    if (map) {
        if (map.paths.includes(path)) {
            return;
        }

        map.paths.push(path);
    }
    else {
        maps.push({ element: element, paths: [path] });
    }
} */