import AutoImport from 'unplugin-auto-import/vite'

export function registerAutoImport() {
  // https://github.com/antfu/unplugin-auto-import
  return AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'types/auto-imports.d.ts',
    dirs: ['src/components', 'src/store'],
    vueTemplate: true,
  })
}
