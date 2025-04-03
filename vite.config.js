import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./", // ← THIS is the important fix
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs'
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: 'all'
  }
});
