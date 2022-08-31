import { calculateAbsoluteRouter } from '@/routers/utils'
import { AccountBookOutlined } from '@ant-design/icons-vue'
import curry from 'lodash.curry'
import type { RouteRecordRaw } from 'vue-router'
import { ROUTER_PREFIX } from './constant'

const generateRedirectURL = curry(calculateAbsoluteRouter)(ROUTER_PREFIX)

export const DemoModuleRoutes: Readonly<RouteRecordRaw> = {
  path: `/${ROUTER_PREFIX}`,
  name: ROUTER_PREFIX,
  redirect: generateRedirectURL('list'),
  meta: {
    title: 'Demo页面',
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
