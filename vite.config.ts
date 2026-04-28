import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// Set ACTA_DEV_HTTPS=1 (see `npm run dev:https`) for HTTPS. Needed when the app
// is not a “secure context” (e.g. http://<LAN-IP>:5173 from a phone, or some
// embedded browser shells). `http://localhost` is already a secure context in
// desktop Chrome; use a normal external browser, not the IDE Simple Browser, for mic.
const useDevHttps = process.env.ACTA_DEV_HTTPS === '1'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ...(useDevHttps ? [basicSsl()] : [])],
})
