import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'vantive-sharesource-remote-amia',
      filename: 'remoteEntry.js',
      exposes: {
        './Amia': './src/AppWrapper',
      },
      remotes: {
        'vantive-mfe-shell': 'http://localhost:3000/dist/assets/remoteEntry.js',
        'vantive-sharesource-remote-capd': 'http://localhost:3003/dist/assets/remoteEntry.js',
        'vantive-sharesource-remote-capd-submodule': 'http://localhost:3005/dist/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],
    }),
  ],
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@mfe/shared-ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
