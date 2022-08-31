import { type VuePluginOptions } from 'types'
import { type Plugin } from 'vue'

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: Plugin = (app, options: VuePluginOptions) => {
  options.router.isReady().then(async () => {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  })
}
