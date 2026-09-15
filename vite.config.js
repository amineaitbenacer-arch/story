import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        thankyou: resolve(__dirname, 'thankyou.html'),
        admin: resolve(__dirname, 'admin.html'),
        jadid: resolve(__dirname, 'jadid.html'),
      },
    },
  },
});
