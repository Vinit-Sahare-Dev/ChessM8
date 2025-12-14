import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          chess: ['chess.js', 'react-chessboard'],
          ui: ['./src/components', './src/styles']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'chess.js', 'react-chessboard']
  }
})
