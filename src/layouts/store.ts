import { STORE_KEYS } from '@/constant/store-keys'
import { defineStore } from 'pinia'

export const layoutStore = defineStore(STORE_KEYS.LAYOUT, {
  state: () => {
    return {
      collapsed: false,
    }
  },
  getters: {},
  actions: {},
})
