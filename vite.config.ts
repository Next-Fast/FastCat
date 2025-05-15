import { defineConfig, UserConfig } from "vite";
import swcReact from "@vitejs/plugin-react-swc";
import AutoImport from 'unplugin-auto-import/vite'
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import sassDts from 'vite-plugin-sass-dts'
import { NodePackageImporter } from 'sass-embedded'
import tailwindcss from '@tailwindcss/vite'

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;
// @ts-expect-error process is a nodejs global
const _port = process.env.IS_TAURI ? 2500 : 4000;
// @ts-expect-error process is a nodejs global
const isDev = new Boolean(process.env.IS_DEV);

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const devtools = () => {
    return {
      name: 'react-devtools',
      transformIndexHtml(html: string) {
        return html.replace(
          /<\/head>/,
          `<script src="http://localhost:8097"></script></head>`,
        )
      },
    }
  };

  const config : UserConfig = {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          importers: [new NodePackageImporter()],
        }
      }
    },
    plugins:
      [
        sassDts({ 
          esmExport: true, 
          enabledMode: ['development'],
        }),
        swcReact({

        }),
        AutoImport({
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          ],
          imports: ['react', 'jotai', 'react-i18next', 'ahooks'],
          dts: './src/auto-imports.d.ts',
          dirs: ['src/components/'],
        }),
        svgr(),
        tsconfigPaths(),
        TanStackRouterVite(),
        tailwindcss(),
        isDev && devtools(),
      ],
    envPrefix: ["VITE_", "IS_"],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: _port,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
          protocol: "ws",
          host,
          port: 2500,
        }
        : undefined,
      watch: {
        // 3. tell vite to ignore watching `src-tauri`
        ignored: ["**/src-tauri/**"],
      },
    },
  };

  return config;
});
