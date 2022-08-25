import NProgress from 'nprogress'
import { type Plugin } from 'vue'
import { type VuePluginOptions } from 'types'

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
