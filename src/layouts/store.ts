import { STORE_KEYS } from '@/constant/keys'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore(STORE_KEYS.LAYOUT, {
  state: () => {
    return {
      collapsed: false,
    }
  },
  getters: {},
  actions: {},
})
