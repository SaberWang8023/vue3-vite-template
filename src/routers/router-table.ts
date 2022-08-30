import { DemoModuleRoutes } from '@/views/DemoModule/router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    children: [DemoModuleRoutes],
  },
]

export const NavRoutes = routes[0].children
