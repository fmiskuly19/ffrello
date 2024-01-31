import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:44358'
  //   }
  // },
  plugins: [react()],
  server: {
    port: 9743
  },
})
