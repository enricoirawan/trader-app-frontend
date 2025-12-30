import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3011,
    proxy: {
      '/ws': {
        target: process.env.VITE_GATEWAY_WS || 'ws://localhost:8000',
        ws: true, // ✅ Aktifkan proxy WebSocket
        changeOrigin: true,
        // ✅ Penting: proxy semua subpath (/ws/info, /ws/iframe.html, dll)
        rewrite: (path) => path, // jangan ubah path
      },
    },
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
