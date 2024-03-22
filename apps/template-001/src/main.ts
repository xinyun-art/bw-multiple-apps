import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './stores'

console.log('main.js-import.meta.env--', import.meta.env)

const theme = import.meta.env.SITE_THEME
import(`./assets/styles/themes/${theme}/index.scss`)

const toggle = (theme: string): void => {
  document.documentElement.classList.toggle(theme)
}
toggle(`theme-${theme}`)

/**
 * 定义启动初始化函数
 */
const bootstrap = (): void => {
  const app = createApp(App)

  // 安装初始化store
  setupStore(app)
  // 安装初始化路由
  setupRouter(app)

  app.config.errorHandler = (err, vm, info) => {
    console.log('全局错误---:', err, vm, info)
  }

  app.mount('#app')
}

// 启动
bootstrap()
