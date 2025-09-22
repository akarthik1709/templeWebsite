import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig ({
  server: {
    open: 'index.html',
    proxy: {
        '/create-payment-intent': 'http://localhost:4242',
      },
    },
})