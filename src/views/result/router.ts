import { HomeOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const ResultRoutes: RouteRecordRaw = {
  path: `/${ROUTER_PREFIX.RESULT}`,
  redirect: `/${ROUTER_PREFIX.RESULT}/list`,
  meta: {
    title: '结果管理',
    icon: HomeOutlined,
    abstract: true,
  },
  component: () => import('./index.vue'),
  children: [
    {
      path: 'list',
      component: () => import('./list/index.vue'),
      meta: { title: '结果管理列表', abstract: true },
      children: [
        {
          path: 'need',
          component: () => import('./list/List.vue'),
          meta: { title: '应结算', permissions: [RESULT_PERMISSION_KEYS['查看应结算列表']] },
        },
        {
          path: 'needless',
          component: () => import('./list/List.vue'),
          meta: { title: '无需结算', permissions: [RESULT_PERMISSION_KEYS['查看无需结算列表']] },
        },
      ],
    },
    // Don't delete this line!!!
  ],
}

//  此处默认导出是为了@routers/router-table.ts 处 import.meta.glob 自动导出 default 方便取值
export default ResultRoutes
