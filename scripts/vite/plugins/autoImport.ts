import AutoImport from 'unplugin-auto-import/vite'
import { type PluginOption } from 'vite'

export function registerAutoImport() {
  // https://github.com/antfu/unplugin-auto-import
  return AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'types/auto-imports.d.ts',
    dirs: ['src/stores', 'src/constant'],
    vueTemplate: true,
  }) as PluginOption
}
