import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { type RouteRecordRaw } from 'vue-router'
import { moduleRouters } from './constant'
import { processRoutes } from './utils'

const IN_QIANKUN = qiankunWindow.__POWERED_BY_QIANKUN__

const component = IN_QIANKUN ? () => import('@/layouts/LayoutContent.vue') : () => import('@/layouts/index.vue')

export const generateRouterConfig = () => {
  const routerConfig: [OptionalRequired<RouteRecordRaw, 'children'>] = [
    {
      path: '/',
      meta: { title: '首页', abstract: true },
      component,
      children: [
        ...moduleRouters,
        // 页面兜底：404：页面找不到 403：无权限
        { path: '/:pathMatch(.*)*', alias: ['/403', '/404'], name: ROUTER_PREFIX.NOT_FOUND, component: () => import('views/404/index.vue') },
      ],
    },
  ]

  const routes: RouteRecordRaw[] = processRoutes(routerConfig)
  return routes
}
