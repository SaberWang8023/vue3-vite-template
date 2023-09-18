declare module 'vue-router' {
  import RouteMeta from 'vue-router'
  /**
   * @internal
   */
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /** 模块标题 */
    title: string

    /** 是否在导航栏中显示，默认为显示 */
    inMenu?: boolean

    /** 导航栏图标 */
    icon?: any

    /** 导航栏中的菜单排序 */
    order?: number

    /** 隐藏左侧菜单栏 */
    hiddenSiderbar?: boolean

    /** 权限 */
    permissions?: string[]

    /** 是否为抽象路由，抽象路由无法具体跳转 */
    abstract?: boolean
  }
}
