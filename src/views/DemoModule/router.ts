import type { RouteRecordRaw } from 'vue-router'
import { ROUTER_PREFIX } from './constant'
import { generateRedirectURL } from './utils'

export const DemoModuleRoutes: RouteRecordRaw = {
  path: `/${ROUTER_PREFIX}`,
  name: ROUTER_PREFIX,
  redirect: generateRedirectURL('list'),
  meta: {},
  component: () => import('components/CommonRouter/index.vue'),
  children: [
    {
      path: `list`,
      name: `${ROUTER_PREFIX}-list`,
      component: () => import('./list/index.vue'),
    },
    {
      path: `detail`,
      name: `${ROUTER_PREFIX}-detail`,
      component: () => import('./detail/index.vue'),
    },
  ],
}
