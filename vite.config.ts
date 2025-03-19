import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ExpoAesVetkeys',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-native',
        '@dfinity/agent',
        'vetkeys-client-utils',
      ],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
