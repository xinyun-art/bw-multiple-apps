import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type { App } from 'vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: () => import('../layout/default.vue'),
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('../views/home/index.vue'),
        },
        {
          path: '/game',
          name: 'Game',
          component: () => import('../views/game/index.vue'),
        }
      ]
    },
  ]
})

/**
 * 路由初始化函数
 * @param app
 */
export const setupRouter = (app: App<Element>): void => {
  app.use(router)
}

export default router
