import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// Local playground; library build uses vite.lib.config.ts
export default defineConfig({
  root: fileURLToPath(new URL('./playground', import.meta.url)),
  publicDir: fileURLToPath(new URL('./playground/public', import.meta.url)),
  plugins: [react(), tailwindcss()],
})
