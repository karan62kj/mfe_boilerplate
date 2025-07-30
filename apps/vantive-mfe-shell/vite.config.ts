import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'vantive-mfe-shell',
      remotes: {
        'vantive-sharesource-remote-dashboard': 'http://localhost:3004/dist/assets/remoteEntry.js',
        'vantive-sharesource-remote-amia': 'http://localhost:3001/dist/assets/remoteEntry.js',
        'vantive-sharesource-remote-claria': 'http://localhost:3002/dist/assets/remoteEntry.js',
        'vantive-sharesource-remote-capd': 'http://localhost:3003/dist/assets/remoteEntry.js',
        'vantive-sharesource-remote-capd-submodule': 'http://localhost:3005/dist/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],
      exposes: {
        './appStore': './src/business/store/app.store.ts',
        './profileSlice': './src/business/slices/profileSlice.ts',
      },
    }),
  ],
  resolve: {
    alias: {
      '@mfe/shared-ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    minify: true,
  },
});
