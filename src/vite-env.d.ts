/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite/client" />
// vite/client.d.ts or env.d.ts

interface ImportMetaEnv {
  readonly VITE_OW_URL: string;
  readonly VITE_OW_API_KEY: string;
  readonly VITE_OW_WEATHER: string;
  readonly VITE_OW_FORECAST: string;
  readonly VITE_OW_ICON_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}