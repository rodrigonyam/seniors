import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Multi-page inputs to preserve the existing page structure
      input: {
        main: resolve(__dirname, 'index.html'),
        activities: resolve(__dirname, 'activities.html'),
        meals: resolve(__dirname, 'meals.html'),
        news: resolve(__dirname, 'news.html'),
        contact: resolve(__dirname, 'contact.html'),
        emergency: resolve(__dirname, 'emergency.html')
      }
    }
  }
});
