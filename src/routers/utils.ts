import { type RouteRecordRaw } from 'vue-router'

/**
 * 绝对路由计算方法，用于redirect
 * @param routerPrefix 路由模块前缀
 * @param routerPath 具体路由
 * @returns 完整的绝对路由
 */
export const calculateAbsoluteRouter = (routerPrefix: string, routerPath: string) => {
  const path = `/${routerPrefix}/${routerPath}`
  const BASE_URL = import.meta.env.BASE_URL
  if (BASE_URL !== '/') {
    return `${BASE_URL}${path}`
  }
  return path
}

/**
 * 获取子路由的第一个默认路由
 * @param routes RouteRecordRaw
 */
export const getDefaultRedirect = (routes: RouteRecordRaw[]) => {
  const firstChildren = routes[0]
  firstChildren.redirect = firstChildren.children?.[0].path
  return routes
}
