import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from 'unplugin-auto-import/vite'
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: 
  [
    react(
      {
        babel: {
          plugins: ['babel-plugin-react-compiler']
        }
      }
    ),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      imports: ['react'],
      dts: './src/auto-imports.d.ts',
      dirs: ['src/components'],
    }),
    svgr(),
    tsconfigPaths(),
    TanStackRouterVite()
  ],
  envPrefix: ["VITE_", "IS_"],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 2500,
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
}));
