import { HomeOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'
import { ROUTER_PREFIX } from './constant'

export const HomeRoutes: Readonly<RouteRecordRaw> = {
  path: `/${ROUTER_PREFIX}`,
  name: ROUTER_PREFIX,
  meta: {
    title: '首页',
    icon: HomeOutlined,
  },
  component: () => import('./index.vue'),
}
