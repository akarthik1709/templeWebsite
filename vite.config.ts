import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/create-payment-intent -> http://localhost:4242/create-payment-intent
      '/create-payment-intent': 'http://localhost:4242',
    },
  },
});
