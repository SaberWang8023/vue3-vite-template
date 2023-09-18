import { type RouteRecordRaw } from 'vue-router'
import { flow } from 'lodash-es'
import { attachRouterNames } from './attach-router-names'

/** 根据 glob 自动获取模块路由 */
export const getModuleRouters = () => {
  const module = import.meta.glob<RouteRecordRaw>('views/**/router.ts', { eager: true, import: 'default' })

  return Object.values(module)
}

/**
 * 生成路由名称
 * @param route 路由对象
 * @param prefix 路由前缀
 * @returns [路由名称的 description, 路由名称的 Symbol]
 * 注意： 为防止重复的路由名称导致报错，这里生成路由名称的是 Symbol
 */
export function generateRouteName(route: RouteRecordRaw, prefix?: string): [string, symbol] {
  const routeName = route.name
  let SymbolDescriptor: string | undefined

  if (routeName) {
    if (typeof routeName === 'string') {
      SymbolDescriptor = routeName
    } else {
      SymbolDescriptor = routeName.description
      if (SymbolDescriptor) {
        return [SymbolDescriptor, routeName]
      }
    }
  }

  if (!SymbolDescriptor) {
    const path = route.path
    if (path === '/') {
      SymbolDescriptor = ''
    } else {
      let name = path
      // 从路由路径中提取名称，并忽略参数，如：detail/:rule => detail
      const matched = path.match(/\/?([^/:]+)(\/:|$)/)
      if (matched) {
        name = matched[1]
      }
      SymbolDescriptor = prefix ? `${prefix}-${name}` : name
    }
  }

  return [SymbolDescriptor, Symbol(SymbolDescriptor)]
}

/**
 * 路由权限过滤
 */
const tinyRouter = (routes: RouteRecordRaw[]) => {
  const { hasPermission } = useGlobalStore(pinia)
  const p = (route: RouteRecordRaw) => {
    if (route.meta?.permissions && !hasPermission(route.meta.permissions)) {
      return
    }
    if (route.children?.length) {
      const children = route.children.map(p).filter(Boolean) as RouteRecordRaw[]
      if (children.length > 0) {
        route.children = children
      }
    }
    return route
  }
  return routes.map(p).filter(Boolean) as RouteRecordRaw[]
}

export const processRoutes = flow(tinyRouter, attachRouterNames)
