import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { type RouterHistory, createRouter, createWebHistory } from 'vue-router'
import { generateRouterConfig } from './router-table'

let routerHistoryInstance: RouterHistory | null = null
const useCreateRouter = () => {
  // qiankun环境下，需要针对 qiankun 子应用路由做处理
  const baseURL = qiankunWindow.__POWERED_BY_QIANKUN__ ? __BASE_ROUTE__ : undefined
  const routerHistory = createWebHistory(baseURL)
  const routes = generateRouterConfig()
  const router = createRouter({ history: routerHistory, routes })
  // qiankun下的history实例会变，所以用变量存起来
  routerHistoryInstance = routerHistory

  return router
}

const routerHistoryDestroy = () => {
  routerHistoryInstance?.destroy?.()
  // eslint-disable-next-line no-console
  console.info('(╯°Д°)╯︵ ┻━┻【routerHistoryDestroyed】')
}

export { useCreateRouter, routerHistoryDestroy }
