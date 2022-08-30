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
