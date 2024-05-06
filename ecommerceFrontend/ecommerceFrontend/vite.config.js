import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    server: {
        proxy: {
            '^/pingauth': {
                target: 'http://localhost:8080/',
                secure: false
            },
            '^/register': {
                target: 'http://localhost:8080/',
                secure: false
            },
            '^/login': {
                target: 'http://localhost:8080/',
                secure: false
            },
            '^/logout': {
                target: 'http://localhost:8080/',
                secure: false
            }
        }
    }
})