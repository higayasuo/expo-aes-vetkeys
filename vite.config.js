import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ExpoAesVetkeys',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-native', 'expo'],
      output: {
        globals: {
          react: 'React',
          'react-native': 'ReactNative',
          expo: 'Expo',
        },
      },
    },
  },
});