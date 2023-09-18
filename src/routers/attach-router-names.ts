import { type RouteRecordRaw } from 'vue-router'
import { generateRouteName } from './utils'

const routeNameMap = new Map<string, symbol>()

/**
 * 获取路由名称
 * @param name 路由名称字符串
 */
function getRouteName(name: string): symbol
/**
 * 获取路由名称
 * @param prefix 路由前缀
 * @param args 路由的路径，不包含路由参数
 * 如：getRouteName(ROUTER_PREFIX.SCHEME, 'list') => Symbol('scheme-list')
 */
function getRouteName(prefix: ValueOfType<typeof ROUTER_PREFIX>, ...args: string[]): symbol
function getRouteName(...args: string[]) {
  if (args.length === 0) throw new Error('getRouteName 必须包含一个参数！')
  let mapKey
  if (args.length === 1) {
    mapKey = getRouteMapKey(args[0])
  } else {
    const [prefix, ...arg] = args
    mapKey = getRouteMapKey(prefix as ValueOfType<typeof ROUTER_PREFIX>, ...arg)
  }
  if (!routeNameMap.has(mapKey)) {
    console.error(`路由名称:${mapKey} 不存在!`)
    return Symbol(mapKey)
  }
  return routeNameMap.get(mapKey)
}

/**
 * 获取路由名称
 * @param args 路由名称位置
 * @returns 路由名称
 */
function getRouteMapKey(name: string): string
function getRouteMapKey(prefix: ValueOfType<typeof ROUTER_PREFIX>, ...args: string[]): string
function getRouteMapKey(prefix: string | ValueOfType<typeof ROUTER_PREFIX>, ...args: string[]) {
  return [prefix, ...args].join('-')
}

/**
 * 为路由配置添加路由名称
 * @param routeCfg 路由配置
 */
function attachRouterNames(routeCfg: RouteRecordRaw[]) {
  routeNameMap.clear()

  const stack: { route: RouteRecordRaw; parentRouteNamePrefix: string }[] = []

  if (Array.isArray(routeCfg)) {
    routeCfg.forEach((route) => {
      stack.push({ route, parentRouteNamePrefix: '' })
    })
  }

  while (stack.length > 0) {
    const { route, parentRouteNamePrefix } = stack.pop()!

    const [routeNamePrefix, routeName] = generateRouteName(route, parentRouteNamePrefix)
    route.name = routeName
    routeNameMap.set(routeNamePrefix, routeName)

    if (route.children?.length) {
      route.children.forEach((child) => {
        stack.push({ route: child, parentRouteNamePrefix: routeNamePrefix })
      })
    }
  }
  return routeCfg
}

export { attachRouterNames, getRouteName, getRouteMapKey }
