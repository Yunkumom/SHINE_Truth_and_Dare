import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' },
  build: { outDir: 'dist', emptyOutDir: true, assetsInlineLimit: 10_000_000 }
})
