import { DemoModuleRoutes } from '@/views/DemoModule/router'
import { HomeRoutes } from '@/views/Home/router'
import { type RouteRecordRaw } from 'vue-router'
import { getDefaultRedirect } from './utils'

export const routes: RouteRecordRaw[] = getDefaultRedirect([
  {
    path: '/',
    name: 'index',
    component: () => import('@/layouts/index.vue'),
    children: [HomeRoutes, DemoModuleRoutes],
  },
])

export const NavRoutes = routes[0].children
