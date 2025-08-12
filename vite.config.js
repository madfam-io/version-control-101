import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html'
      },
      output: {
        manualChunks: {
          // Split vendor dependencies
          vendor: ['lit', 'lit-html'],
          // Split interactive components
          components: [
            'src/js/components/drag-drop.js',
            'src/js/components/branch-simulator.js',
            'src/js/components/collaboration-sim.js'
          ]
        }
      }
    },
    // Enable source maps for debugging
    sourcemap: true,
    // Optimize chunks
    chunkSizeWarningLimit: 1000
  },
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Guía Pedagógica de Control de Versiones',
        short_name: 'Git Pedagogy',
        description: 'Interactive pedagogical guide for version control',
        theme_color: '#2563eb',
        background_color: '#f1f5f9',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheKeyWillBeUsed: async ({ request }) => request.url
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['lit', 'lit-html']
  }
});