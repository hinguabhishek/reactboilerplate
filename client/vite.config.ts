import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'transform-jsx-in-node_modules',
      async transform(code, id) {
        // Check if the file is from a specific node_module
        if (id.includes('node_modules/@avalara//skylab-form-render')) {
          // Use the exposed transform from vite, instead of directly transforming with esbuild
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          });
        }
      },
    },
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // Treat all .js files as JSX
      },
    },
  },
  build: {
    outDir: '../dist/client', // Output directory for build,
    rollupOptions:{
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
})
