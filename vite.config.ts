import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      utils: resolve('src/utils'),
    },
  },
  plugins: [
    Vue(),
    VueJsx(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
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
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/components', 'src/store'],
      vueTemplate: true,
    }),
    VitePWA(),
    Inspect(),
  ],
})
