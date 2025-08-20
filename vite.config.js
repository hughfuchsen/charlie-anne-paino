import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import svgr from "@svgr/rollup";

// export default {
//   plugins: [svgr()],
// };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  plugins: [svgr()],
  build: {
    outDir: 'dist'
  }
});

