/// <reference types="vite/client" />
export type MODE = 'development' | 'project' | 'test' | 'sml' | 'production'

declare global {
  interface ImportMetaEnv {
    // 编译模式
    MODE: MODE
    /** 环境类型参数 */
    VITE_BASE_ENV: MODE
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  /**
   * @type {string} 基础路由
   */
  declare const __BASE_ROUTE__: string
  /**
   * @type {string} 项目环境启动参数
   */
  declare const __GROUP_ID__: string
  /**
   * @type {string} 项目名称
   */
  declare const __APP_NAME__: string
}
