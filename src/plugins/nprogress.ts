import NProgress from 'nprogress'
import { type VuePluginOptions } from 'types'
import { type Plugin } from 'vue'

export const install: Plugin = (app, options: VuePluginOptions) => {
  const { router } = options
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  router.beforeEach((to, from) => {
    if (to.path !== from.path) NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
