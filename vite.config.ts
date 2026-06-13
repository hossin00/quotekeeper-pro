import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/quotekeeper-pro/',
  build: { outDir: 'dist' }
})
