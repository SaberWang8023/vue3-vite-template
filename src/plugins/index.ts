import { type Plugin, type App } from 'vue'
import { type VuePluginOptions } from 'types'

export const registerPlugin = (app: App<Element>, options: VuePluginOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.values(import.meta.glob<{ install: Plugin }>(['./*.ts', '!./index.ts'], { eager: true })).forEach((i) => app.use(i, options))
}
