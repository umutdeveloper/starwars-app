import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_HREF,
    plugins: [react(), tsconfigPaths(), visualizer()],
    build: {
      target: 'es2015',
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './tests/setup.js',
    },
    resolve: {
      alias: {
        '@assets': '/src/assets',
        '@features': '/src/features',
        '@store': '/src/store',
        '@hooks': '/src/hooks',
      },
    },
  };
});
