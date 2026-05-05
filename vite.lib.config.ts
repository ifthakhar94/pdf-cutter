import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*'],
      rollupTypes: true,
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'antd',
        '@ant-design/icons',
        'react-pdf',
        'pdfjs-dist',
        'pdf-lib',
        '@dnd-kit/core',
        '@dnd-kit/sortable',
        '@dnd-kit/utilities',
      ],
      output: {
        assetFileNames: 'pdf-cutter[extname]',
      },
    },
  },
})
