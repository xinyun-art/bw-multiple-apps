import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { normalizeConfigs, siteEnvConfigs } from './configs/index'
import StyleInject from './plugins/style-inject/index'

const themePath = fileURLToPath(
  new URL(`./src/assets/styles/themes/${siteEnvConfigs.SITE_THEME}/index.scss`, import.meta.url)
)
// const themePath2 = fileURLToPath(
//   new URL(`./src/assets/styles/themes/002/index.scss`, import.meta.url)
// )
// const themePath3 = fileURLToPath(
//   new URL(`./src/assets/styles/themes/003/index.scss`, import.meta.url)
// )

// https://vitejs.dev/config/
export default defineConfig((ctx) => {
  return {
    plugins: [
      vue(),
      StyleInject({
        css: [
          themePath,
          // {
          //   url: themePath2,
          //   dynamicImport: true
          // },
          // {
          //   url: themePath3
          // }
        ],
        boot: []
      }),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: './types/auto-imports.d.ts'
      }),
      Components({
        dirs: ['src/components'],
        dts: './types/components.d.ts'
      })
    ],
    define: {
      ...normalizeConfigs(siteEnvConfigs, 'import.meta.env.')
    },
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
