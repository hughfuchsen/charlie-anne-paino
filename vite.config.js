import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// export default {
//   plugins: [svgr()],
// };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
});

