import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
export function registerComponents() {
  // https://github.com/antfu/unplugin-vue-components
  return Components({
    resolvers: [AntDesignVueResolver()],
    extensions: ['vue'],
    dts: 'types/components.d.ts',
    types: [
      {
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      },
    ],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  })
}
