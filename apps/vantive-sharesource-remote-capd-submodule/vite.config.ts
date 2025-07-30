import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'vantive-sharesource-remote-capd-submodule',
      filename: 'remoteEntry.js',
      exposes: {
        './CapdSubmodule': './src/AppWrapper',
      },
      remotes: {
        'vantive-mfe-shell': 'http://localhost:3000/dist/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],
    }),
  ],
  server: {
    port: 3005,
  },
  preview: {
    port: 3005,
  },
  resolve: {
    alias: {
      '@mfe/shared-ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
