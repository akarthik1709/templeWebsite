import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
module.exports = {
  build: {
    outDir: '../build',
    assetsDir: 'assets',
    rollupOptions: {
      external: ['react','react-dom'],
    },
  },
}
