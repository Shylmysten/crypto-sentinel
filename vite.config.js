import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          ui: ['react-hot-toast', 'react-icons'],
          crypto: ['crypto-js'],
        }
      }
    },
    // Enable source maps for production debugging
    sourcemap: true,
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Environment variable prefix
  envPrefix: 'VITE_',
  // Development server optimizations
  server: {
    port: 3000,
    open: true
  }
})
