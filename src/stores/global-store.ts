import { defineStore } from 'pinia'

const getPermissionSet = (val: GlobalStore.IMenuTree) => {
  const permissionList: string[] = []
  const stack = [...val]
  while (stack.length) {
    const item = stack.pop()
    if (item) {
      permissionList.push(item.url)
      if (item.resources) {
        stack.push(...item.resources)
      }
    }
  }
  return new Set(permissionList)
}

const storeSetup = () => {
  const state = shallowReactive<GlobalStore.IGlobalStore>({
    userInfo: undefined,
    menuTree: undefined,
    permissionSet: undefined,
  })

  const setUserInfo = (val: GlobalStore.IUserInfo) => {
    state.userInfo = readonly(val)
  }

  const setMenuTree = (val: GlobalStore.IMenuTree) => {
    state.menuTree = readonly(val)
    state.permissionSet = readonly(getPermissionSet(val))
  }

  function hasPermission(val: string | string[]) {
    if (!state.permissionSet) {
      return false
    }
    if (Array.isArray(val)) {
      return val.some((item) => state.permissionSet!.has(item))
    }
    return state.permissionSet.has(val)
  }

  return { ...toRefs(state), setUserInfo, setMenuTree, hasPermission }
}

export const useGlobalStore = defineStore(STORE_KEYS.GLOBAL_STORE, storeSetup)

// 如果store需要热更新，要手动调用
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
// }
