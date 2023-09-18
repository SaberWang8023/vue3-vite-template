// https://github.com/webfansplz/vite-plugin-vue-devtools
import VueDevTools from 'vite-plugin-vue-devtools'
import { type ViteEnv } from '../../../types/index'
import { type PluginOption } from 'vite'

export function registerDevtools(viteEnv: ViteEnv): PluginOption {
  if (viteEnv.MODE !== 'production') {
    return VueDevTools()
  }
}
