import { defineConfig } from "vite";
/* import react from "@vitejs/plugin-react"; */
import swcReact from "@vitejs/plugin-react-swc";
import AutoImport from 'unplugin-auto-import/vite'
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import eslint from 'vite-plugin-eslint2'

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: 
  [
/*     react(
      {
        babel: {
          plugins: ['babel-plugin-react-compiler']
        }
      }
    ), */
    swcReact({
      
    }),
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
    TanStackRouterVite(),
    eslint(
      {
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['node_modules/**/*'],
        dev: false,
        build: false,
      }
    )
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
