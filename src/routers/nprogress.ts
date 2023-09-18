import NProgress from 'nprogress'
import type { Router } from 'vue-router'

export const installNProcess = (router: Router) => ({
  install: () => {
    router.beforeEach((to, from) => {
      if (to.path !== from.path) NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  },
})
