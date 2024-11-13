import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 4000,
        open: true,
    },
    plugins: [
        react()
    ],
    build: {
        target: 'esnext',
        minify: 'esbuild',
        chunkSizeWarningLimit: 500,
    }
});
