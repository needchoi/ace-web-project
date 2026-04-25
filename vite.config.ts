import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import { VitePWA } from 'vite-plugin-pwa'; // 호환성 이슈로 잠시 주석 처리

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    /*
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ACE Football Manager',
        short_name: 'ACE',
        description: 'Next-gen Football Management Platform',
        theme_color: '#0F172A',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
    */
  ],
});
