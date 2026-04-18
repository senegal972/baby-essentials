import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// Hash court du dernier commit git (ou timestamp si pas de git)
let buildHash
try {
  buildHash = execSync('git rev-parse --short HEAD').toString().trim()
} catch {
  buildHash = Date.now().toString(36)
}

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_HASH__: JSON.stringify(buildHash),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom']
        }
      }
    }
  }
})
