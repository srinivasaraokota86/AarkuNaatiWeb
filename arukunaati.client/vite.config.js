import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    //server: {
    //    https: false,       // <-- change to true only if you add certs
    //    port: 5173
    //}
})
