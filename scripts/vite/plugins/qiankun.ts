/**
 * vite-plugin-qiankun
 * https://github.com/tengmaoqing/vite-plugin-qiankun
 */
import qiankun from 'vite-plugin-qiankun'
import { type ViteEnv } from '../../../types/index'

export function registerQiankun(viteEnv: ViteEnv) {
  const { BUILD_QIANKUN_APP_NAME } = viteEnv
  if (BUILD_QIANKUN_APP_NAME) {
    // 命令行中跟随 `--attach` 则说明启动的是子应用附加模式，则能在 qiankun 中调试，否则不行
    const useDevMode = process.env.ATTACH_QIANKUN === 'true'
    return qiankun(BUILD_QIANKUN_APP_NAME, { useDevMode })
  }
}
