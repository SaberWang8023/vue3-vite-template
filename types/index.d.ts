import { type Router } from 'vue-router'
export type VuePluginOptions = { router?: Router }

export type MODE = 'dev' | 'test' | 'sml' | 'prod'

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
}
