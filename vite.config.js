import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: 'https://jack-app.github.io/jackHack2025_G/',
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
})
