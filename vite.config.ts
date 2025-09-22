import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'prompt',
    devOptions: { enabled: false },
    workbox: {
      globPatterns: [], // 🛑 No precaching
      runtimeCaching: [], // 🛑 No runtime caching at all
    },
    manifest: {
      name: 'Hero Weather',
      short_name: 'weather-app',
      description: 'A weather app built with React, Vite, and Tailwind CSS. -Soumabha Saha',
      theme_color: '#00000000',
      icons: [{
        src: "pwa-64x64.png",
        sizes: "64x64",
        type: "image/png"
      },
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }]
    }
  })],
  server: {
    proxy: {
      '/icon': 'https://openweathermap.org'
    },
  },
})


