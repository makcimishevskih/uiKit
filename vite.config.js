import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    dedupe: ['vue'], // dn
    alias: {
      vue: path.resolve('./node_modules/vue'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'vue-ui-kit-basic',
      fileName: (format) => {
        return `vue-ui-kit-basic.${format}.js`
      }
    }
  },
  rollupOptions: {
    external: ['vue'],
    output: {
      vue: 'Vue'
    }
  },

  // dn
  chainWebpack(config) {
    config.resolve.symlinks(false)
    config.resolve.alias.set('vue', path.resolve('./node_modules/vue'))
  }
})
