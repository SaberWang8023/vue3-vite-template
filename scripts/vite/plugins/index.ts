import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { type PluginOption } from 'vite'
import { type ViteEnv } from '../../../types/index'
import { registerAutoImport } from './autoImport'
import { registerComponents } from './components'
import { registerQiankun } from './qiankun'
import { registerSvgIconsPlugin } from './svgSprite'
import { registerVisualizer } from './visualizer'
import { registerDevtools } from './devtools'

export function generateVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: PluginOption[] = [Vue(), VueJsx()]

  //  unplugin-vue-components/vite
  vitePlugins.push(registerComponents())

  // unplugin-auto-import/vite
  vitePlugins.push(registerAutoImport())

  // vite-plugin-svg-icons
  vitePlugins.push(registerSvgIconsPlugin(isBuild))

  // rollup-plugin-visualizer
  vitePlugins.push(registerVisualizer())

  // vite-plugin-qiankun
  vitePlugins.push(registerQiankun(viteEnv))

  // vite-plugin-vue-devtools
  vitePlugins.push(registerDevtools(viteEnv))

  return vitePlugins.filter(Boolean)
}
