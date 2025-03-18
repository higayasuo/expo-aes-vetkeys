import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-native',
        '@dfinity/agent',
        '@react-native-async-storage/async-storage',
        'expo-secure-store',
        'expo-crypto',
        'expo-crypto-universal',
        'expo-storage-universal',
      ],
    },
  },
  plugins: [react()],
});
