import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This rule says: if you see a request starting with "/api",
      // forward it to the backend server at http://localhost:3000
      '/api': {
        target: 'http://localhost:5000', // Your backend server's address
        changeOrigin: true, // Recommended for virtual hosts
        secure: false,      // Recommended for HTTP targets
      },
    },
  },
})
