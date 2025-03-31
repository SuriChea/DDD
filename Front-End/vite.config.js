import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user': 'http://localhost:8000',  // ตั้งค่า Proxy เพื่อให้คำขอไปที่ /user ถูกส่งไปที่ localhost:8000
    },
  },
})
