import { AccountBookOutlined } from '@ant-design/icons-vue'
import CommonRouter from 'components/CommonRouter/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const FactorRoutes: Readonly<RouteRecordRaw> = {
  path: `/${ROUTER_PREFIX.FACTOR}`,
  redirect: `/${ROUTER_PREFIX.FACTOR}/list`,
  meta: {
    title: '系数管理',
    icon: AccountBookOutlined,
  },
  // component: () => import('components/CommonRouter/index.vue'),
  component: defineComponent({
    render() {
      // TODO: 讲道理此处应该是会通过unplugin-vue-components自动引入的，不知道为啥没引入
      // 最好就是这里能用TSX去写，可以控制是否需要KeepAlive
      return <CommonRouter />
    },
  }),
  children: [
    {
      path: 'list',
      component: () => import('./list/index.vue'),
      meta: { title: '系数管理列表' },
    },
    {
      path: 'detail',
      component: () => import('./detail/index.vue'),
      meta: { title: 'Demo详情' },
    },
  ],
}

//  此处默认导出是为了@routers/router-table.ts 处 import.meta.glob 自动导出 default 方便取值
export default FactorRoutes
