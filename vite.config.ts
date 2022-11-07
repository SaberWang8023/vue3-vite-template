import { resolve } from 'node:path'
import { generateVitePlugins } from './tools/vite/plugins'

import { defineConfig, loadEnv } from 'vite'
import { parseEnv } from './tools/vite/utils'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log(`(╯°Д°)╯︵ ┻━┻JSON`, env)
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = parseEnv(env)

  const isBuild = command === 'build'
  return {
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
          // modifyVars: {
          //   hack: `true; @import 'ant-design-vue/es/style/themes/default.less'`,
          // }
        },
      },
    },
    plugins: generateVitePlugins(viteEnv, isBuild),
  }
})
