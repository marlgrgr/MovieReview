import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  
  base: '/',
  
  build: {
    outDir: 'dist',
    
    minify: 'terser',
    
    cssCodeSplit: true,
    
    assetsInlineLimit: 4096,
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    sourcemap: false,
  },
});