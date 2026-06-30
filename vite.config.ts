import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'ool-innovation-compass' to your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/ool-innovation-compass/',
})
