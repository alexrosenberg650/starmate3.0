import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html') // 👈 explicitly define the entry
    }
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: 'all'
  }
});

