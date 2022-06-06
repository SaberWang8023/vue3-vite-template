import type { RouteRecordRaw } from 'vue-router'

export const TestManagerRoutes: RouteRecordRaw = {
  path: '/test-manager',
  name: 'test-manager',
  component: () => import('views/TestManager/index.vue'),
}
