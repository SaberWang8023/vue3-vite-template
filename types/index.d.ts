import { type Router } from 'vue-router'
export type VuePluginOptions = { router?: Router }

export interface ViteEnv extends Pick<ImportMetaEnv, 'MODE'> {
  /** 项目启动端口 */
  readonly BUILD_PORT?: number
  /** 站点名称 */
  readonly BUILD_APP_TITLE?: string
  /** 是否启用PWA */
  readonly BUILD_USE_PWA?: string
  /** 是否在编译产物中跳过console */
  readonly BUILD_DROP_CONSOLE?: boolean
  /** PWA的短名称 */
  readonly BUILD_APP_SHORT_NAME?: string
  /**
   * 是否引用 @vitejs/plugin-legacy 插件
   * 影响打包产物的 chunk 以及 polyfill 生成
   */
  readonly BUILD_LEGACY?: boolean
  /**
   * 注册 qiankun 的APP Names
   * 在vite.config中注入
   */
  BUILD_QIANKUN_APP_NAME?: string
}
