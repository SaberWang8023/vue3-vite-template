/** 如果开启了 __BUILD_USE_PWA__，请取消注释以下部分代码以达到自定义PWA的效果 */

// import { type VuePluginOptions } from 'types'
// import { type Plugin } from 'vue'

// // https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
// export const install: Plugin = (app, options: VuePluginOptions) => {
//   options.router.isReady().then(async () => {
//     const { registerSW } = await import('virtual:pwa-register')
//     registerSW({ immediate: true })
//   })
// }
