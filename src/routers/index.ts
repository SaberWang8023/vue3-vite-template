import { TestManagerRoutes } from 'views/TestManager/router'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('components/Layout/index.vue'),
    children: [TestManagerRoutes],
  },
]

export const routers = createRouter({ history: createWebHistory(), routes })

routers.beforeEach((to) => {
  if (to.path !== '/login') {
  }
})

export const NavRoutes = routes[0].children
