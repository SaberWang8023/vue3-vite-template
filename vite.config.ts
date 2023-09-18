import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { generateVitePlugins } from './scripts/vite/plugins'
import { convertEnv, generateViteConfig } from './scripts/vite/utils'

const root = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 需要使用 qiankun，第二个参数就传true
  const { base, assetsDir, BUILD_QIANKUN_APP_NAME, __GROUP_ID__, __BASE_ROUTE__, __APP_NAME__ } = generateViteConfig(mode, true)

  const env = loadEnv(mode, root, 'BUILD_')

  const viteEnv = convertEnv(env)

  viteEnv.BUILD_QIANKUN_APP_NAME = BUILD_QIANKUN_APP_NAME

  const { BUILD_PORT, BUILD_DROP_CONSOLE } = viteEnv

  const IS_BUILD = command.startsWith('build')

  const plugins = generateVitePlugins(viteEnv, IS_BUILD)

  return {
    base,
    root,
    define: {
      __APP_NAME__: JSON.stringify(__APP_NAME__),
      __BASE_ROUTE__: JSON.stringify(__BASE_ROUTE__),
      __GROUP_ID__: JSON.stringify(__GROUP_ID__),
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        components: resolve('src/components'),
        views: resolve('src/views'),
        utils: resolve('src/utils'),
        types: resolve('types'),
      },
    },
    css: {
      postcss: {},
      preprocessorOptions: {
        less: {
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true,
          additionalData: `@import "${resolve('src/styles/var.less')}";`,
        },
      },
    },
    plugins,
    server: {
      port: BUILD_PORT,
      host: '0.0.0.0',
    },
    esbuild: {
      drop: BUILD_DROP_CONSOLE ? ['console', 'debugger'] : undefined,
    },
    build: { assetsDir },
  }
})
