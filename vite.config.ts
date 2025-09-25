import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/create-payment-intent': 'https://sringeri-sharadhapeetam.vercel.app:4242',
    },
  },
});
