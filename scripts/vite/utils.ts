import pkg from '../../package.json'
import type { MODE } from '../../types/env'
import { type ViteEnv } from '../../types/index'
import { generateVersion } from './release-version'

/**
 * 转换 env 定义中的变量，使之类型正确
 * @param env env 字符串对象
 * @returns
 */
export const convertEnv = (env: Record<string, string>) => {
  const result: Partial<ViteEnv> = {}
  Object.entries(env).forEach(([key, value]) => {
    let relVal: unknown = value.replace(/\\n/g, '\n')

    if (typeof relVal === 'string') {
      if (['true', 'false'].includes(relVal)) {
        relVal = JSON.parse(relVal)
      } else if (/^([1-9]\d*.?\d*)|(0.\d*[1-9])$/.test(relVal)) {
        relVal = parseFloat(relVal)
      }
    }

    result[key] = relVal
  })

  return result as ViteEnv
}

/**
 * 获取groupID
 * @returns {string | undefined}
 * 虽然无脑，但是 vite 的脑残设计不得传递除 vite 命令行允许的命令之外的参数
 * 所以所以变量的传递，一定一定一定要放最后一个参数！！！！
 * via:  https://github.com/vitejs/vite/pull/1188
 */
const getGroupID = (): string | undefined => {
  const args = process.argv.slice(2)
  // 如果没有groupID，则 args = [ '.', 'open', '.' ]，所以根据长度判断
  if (args.length > 3) {
    return args.at(-1)
  }
}

/**
 * 生成 vite 的配置
 * @param mode vite启动模式，字符串形式，一般为 'development' | 'project' | 'test' | 'sml' | 'production'
 * @param useQiankun 是否使用 qiankun
 * @returns
 */
export const generateViteConfig = (mode: string, useQiankun = false) => {
  // 测试、模拟、生产环境是用Nginx托管的
  const NGINX_MODE: Omit<MODE, 'development' | 'project'>[] = ['test', 'sml', 'production']

  const IS_NGINX_MODE = NGINX_MODE.includes(mode)

  const __APP_NAME__ = pkg.name

  const __GROUP_ID__ = getGroupID()

  let base = '/'
  let __BASE_ROUTE__ = '/'
  // eslint-disable-next-line no-undef-init
  let BUILD_QIANKUN_APP_NAME: string | undefined = undefined

  if (useQiankun) {
    const BASE_URL_MAP: Record<MODE, string> = {
      development: '/',
      project: `http://support-microfe-${__APP_NAME__}-${__GROUP_ID__}.projectk8s.tsign.cn`,
      test: `https://asset.tsign.cn/apps/support-microfe/${__APP_NAME__}`,
      sml: `https://asset.tsign.cn/apps/support-microfe/${__APP_NAME__}`,
      production: `https://asset.tsign.cn/apps/support-microfe/${__APP_NAME__}`,
    }

    base = BASE_URL_MAP[mode] ?? '/'

    __BASE_ROUTE__ = `/microfe/${__APP_NAME__}`

    BUILD_QIANKUN_APP_NAME = __APP_NAME__
  }

  const assetsDir = IS_NGINX_MODE ? `${mode}/${generateVersion()}` : undefined

  return { base, assetsDir, BUILD_QIANKUN_APP_NAME, __GROUP_ID__, __BASE_ROUTE__, __APP_NAME__ }
}
