import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  plugins: [
    react(),
    ...VitePluginNode({
      // Node-plugin options
      adapter: 'express',
      appPath: './server/server.js',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
    })
  ],
  server: {
    port: 3000 // Your frontend port
  }
});
