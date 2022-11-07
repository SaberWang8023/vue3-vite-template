import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { PluginOption } from 'vite'
import { type ViteEnv } from '../../../types/index'
import { registerAutoImport } from './autoImport'
import { registerComponents } from './components'
import { registerInspect } from './inspect'
import { registerPwa } from './pwa'
import { registerSvgIconsPlugin } from './svgSprite'
import { registerVisualizer } from './visualizer'

export function generateVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { BUILD_USE_PWA, MODE } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [Vue(), VueJsx()]

  //  unplugin-vue-components/vite
  vitePlugins.push(registerComponents())
  // unplugin-auto-import/vite
  vitePlugins.push(registerAutoImport())
  // vite-plugin-svg-icons
  vitePlugins.push(registerSvgIconsPlugin(isBuild))

  // rollup-plugin-visualizer
  process.env.REPORT === 'true' && vitePlugins.push(registerVisualizer())

  // vite-plugin-inspect
  MODE !== 'prod' && vitePlugins.push(registerInspect())

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-pwa
    BUILD_USE_PWA && vitePlugins.push(registerPwa(viteEnv))
  }

  return vitePlugins
}
