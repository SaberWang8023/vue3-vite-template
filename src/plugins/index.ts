import { type VuePluginOptions } from 'types'
import { type App, type Plugin } from 'vue'

export const registerPlugin = (app: App<Element>, options: VuePluginOptions) => {
  Object.values(import.meta.glob<Plugin>(['./*.ts', '!./index.ts'], { eager: true })).forEach((i) => app.use(i, options))
}
