import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupI18n, lang, _lang } from './i18n'

console.log('main.js-import.meta.env--', import.meta.env)

const theme = import.meta.env.SITE_THEME
// import(`./assets/styles/themes/theme-${theme}/index.scss`)

const toggle = (theme: string): void => {
  document.documentElement.classList.toggle(theme)
}
toggle(`theme-${theme}`)

// const cssModule = import.meta.glob('./assets/styles/themes/**/*.scss')
// console.log('cssModule--', cssModule)
/**
 * 定义启动初始化函数
 */
const bootstrap = (): void => {
  const app = createApp(App)

  // 安装初始化store
  setupStore(app)
  // 安装初始化路由
  setupRouter(app)
  // 安装初始化i18n
  setupI18n(app)

  app.config.globalProperties.$t = lang
  app.config.globalProperties.$tt = _lang

  app.config.errorHandler = (err, vm, info) => {
    console.log('全局错误---:', err, vm, info)
  }

  app.mount('#app')
}

// 启动
bootstrap()
