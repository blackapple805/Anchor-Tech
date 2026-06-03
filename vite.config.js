import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

const certExists = fs.existsSync('./localhost+1-key.pem') && fs.existsSync('./localhost+1.pem')

export default defineConfig({
     plugins: [react()],
     base: '/Anchor-Tech/',
   })