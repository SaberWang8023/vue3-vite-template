import { routerHistoryDestroy, useCreateRouter } from '@/routers'
import '@/styles/index.less'
import 'virtual:svg-icons-register'
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import { createApp } from 'vue'
import { setGlobalOptions } from 'vue-request'
import App from './App.vue'
import { getNavList, getUserInfo } from './api/userinfo'
import { installNProcess } from './routers/nprogress'
import { pinia } from './stores'

interface PropsType {
  container?: Element
  onGlobalStateChange?: (
    callback: (propsVal: { userInfo: GlobalStore.IUserInfo; menuTree: GlobalStore.IMenuTree }) => void,
    fireImmediately?: boolean
  ) => void
}

const CONTAINER_ID = 'app'

const { setUserInfo, setMenuTree } = useGlobalStore(pinia)

const bootstrapApp = (wrapper: string | Element) => {
  const app = createApp(App)
  const router = useCreateRouter()
  app.use(pinia).use(router).use(installNProcess(router)).mount(wrapper)
  return app
}

const initState = async () => {
  const userInfo = await getUserInfo()
  const navInfo = await getNavList(userInfo.id)
  userInfo.account = userInfo.id
  const allRouter = (navInfo?.resources ?? []) as GlobalStore.IMenuTree
  setUserInfo(userInfo)
  setMenuTree(allRouter)
}

const bootstrap = async () => {
  setGlobalOptions({
    manual: true,
  })

  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-console
    console.info('(╯°Д°)╯︵ ┻━┻没有通过 qiankun 启动！！！')
    await initState()
    bootstrapApp(`#${CONTAINER_ID}`)
  } else {
    // eslint-disable-next-line no-console
    console.info('(╯°Д°)╯︵ ┻━┻通过 qiankun 启动了')

    let app: ReturnType<typeof createApp>

    renderWithQiankun({
      mount(props) {
        // eslint-disable-next-line no-console
        console.info(`应用 ${__APP_NAME__} --mount`)

        const { container, onGlobalStateChange } = props as PropsType

        const wrapper = (container ? container.querySelector(`#${CONTAINER_ID}`) : document.getElementById(CONTAINER_ID)) as Element
        if (onGlobalStateChange) {
          void new Promise<void>((resolve) => {
            onGlobalStateChange((propsVal) => {
              const { userInfo, menuTree } = propsVal
              userInfo && setUserInfo(userInfo)
              menuTree && setMenuTree(menuTree)
              resolve()
            }, true)
          }).then(() => {
            app = bootstrapApp(wrapper)
          })
        } else {
          console.error('(╯°Д°)╯︵ ┻━┻主应用的onGlobalStateChange没传进来！！！')
          initState()
            .then(() => {
              app = bootstrapApp(wrapper)
            })
            .catch((err) => {
              console.error('(╯°Д°)╯︵ ┻━┻initState()注册APP失败了！！！', err)
            })
        }
      },
      bootstrap() {
        // eslint-disable-next-line no-console
        console.info(`应用 ${__APP_NAME__} --bootstrap`)
      },
      update() {
        // eslint-disable-next-line no-console
        console.info(`应用 ${__APP_NAME__} --update`)
      },
      unmount() {
        // eslint-disable-next-line no-console
        console.info(`应用 ${__APP_NAME__} --unmount`)
        routerHistoryDestroy()
        app?.unmount()
      },
    })
  }
}

void bootstrap()
