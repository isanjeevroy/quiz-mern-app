import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 server:{
  proxy:{
    '/api':'https://react-quiz-app-d2w3.onrender.com'
  }
 },
  plugins: [react()],
})
