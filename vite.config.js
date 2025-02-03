import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      manifest: {
        name: 'Todo generator',
        short_name: 'todo',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        description: 'A todo generator app',
        icons: [
          {
            src: '/Designer.jpeg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any'
          },
          {
            src: '/Designer.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any'
          },
        ],
      }
    }),
  ],
})
