import { defineConfig } from "vite"
import Inspect from 'vite-plugin-inspect'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    plugins: [
        Inspect()
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer({}) // add options if needed
            ],
        }
    },
    base: '/llm-frontend/'
})
