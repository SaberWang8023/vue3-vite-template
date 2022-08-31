import { type VuePluginOptions } from 'types'
import { type App, type Plugin } from 'vue'

export const registerPlugin = (app: App<Element>, options: VuePluginOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.values(import.meta.glob<{ install: Plugin }>(['./*.ts', '!./index.ts'], { eager: true })).forEach((i) => app.use(i, options))
}
