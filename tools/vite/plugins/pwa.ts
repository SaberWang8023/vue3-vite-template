/**
 * Zero-config PWA for Vite
 * https://github.com/antfu/vite-plugin-pwa
 */
import { VitePWA } from 'vite-plugin-pwa'
import { type ViteEnv } from '../../../types/index'

export function registerPwa(viteEnv: ViteEnv) {
  const { BUILD_APP_TITLE, BUILD_APP_SHORT_NAME } = viteEnv

  // vite-plugin-pwa
  return VitePWA({
    manifest: {
      name: BUILD_APP_TITLE,
      short_name: BUILD_APP_SHORT_NAME,
      icons: [
        {
          // TODO: 没有相关资源
          src: './resource/img/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          // TODO: 没有相关资源
          src: './resource/img/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  })
}
