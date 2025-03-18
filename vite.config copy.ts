import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'index': resolve(__dirname, 'src/index.ts'),
      },
      name: 'expo-aes-vetkeys',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-native', '@dfinity/agent']
    }
  },
  plugins: [
    react(),
    dts({ rollupTypes: true })
  ]
});