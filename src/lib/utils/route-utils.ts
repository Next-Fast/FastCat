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

export const UseMainLayoutPaths: { path: string, element: FC}[] = [

];