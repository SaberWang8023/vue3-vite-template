import { HomeOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const SchemeRoutes: Readonly<RouteRecordRaw> = {
  path: `/${ROUTER_PREFIX.SCHEME}`,
  redirect: `/${ROUTER_PREFIX.SCHEME}/list`,
  meta: {
    title: '方案管理',
    icon: HomeOutlined,
    permissions: [SCHEME_PERMISSION_KEYS['查看方案管理']],
    abstract: true,
  },
  component: () => import('./index.vue'),
  children: [
    {
      path: 'list',
      component: () => import('./list/index.vue'),
      meta: { title: '方案管理列表' },
    },
    {
      path: 'detail/:ruleId',
      component: () => import('./detail/index.vue'),
      meta: {
        title: '方案详情',
      },
    },
    // Don't delete this line!!!
  ],
}

//  此处默认导出是为了@routers/router-table.ts 处 import.meta.glob 自动导出 default 方便取值
export default SchemeRoutes
