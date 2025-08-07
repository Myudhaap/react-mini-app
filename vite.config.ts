import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/weather': {
        target: 'https://openapi.de4a.space',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/weather/, '/api/weather'),
      },
    },
  },
})
