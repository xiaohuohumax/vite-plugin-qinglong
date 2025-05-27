import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    outDir: 'dist',
    format: ['esm'],
    target: 'esnext',
    shims: true,
    outExtension: ({ format }) => ({
      js: { esm: '.mjs', cjs: '.cjs', iife: '.js' }[format],
    }),
  },
])
