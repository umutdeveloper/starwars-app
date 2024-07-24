import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'es2015',
  },
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@features': '/src/features',
      '@store': '/src/store',
      '@hooks': '/src/hooks',
    }
  }
});
