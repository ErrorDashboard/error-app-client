import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const host = process.env.VITE_HOST || 'localhost';
const port = process.env.VITE_PORT || '3030';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: host,
    port: parseInt(port, 10),
  },
});
