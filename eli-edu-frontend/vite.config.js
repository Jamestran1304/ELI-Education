import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        '@mui/material',
        '@mui/icons-material',
        'framer-motion',
        'react',
        'react-dom',
        'axios'
      ],
      output: {
        manualChunks: {} // Removed all manualChunks to avoid conflicts
      }
    },
    chunkSizeWarningLimit: 1000 // Adjust chunk size warning limit
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  optimizeDeps: {
    include: ['@emotion/react'],
  },
})
