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

export const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  if (to.path !== '/login') {
  }
})

export const NavRoutes = routes[0].children
