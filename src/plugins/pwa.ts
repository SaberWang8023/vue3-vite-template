import { type Plugin } from 'vue'
import { type VuePluginOptions } from 'types'

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: Plugin = (app, options: VuePluginOptions) => {
  options.router.isReady().then(async () => {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  })
}
