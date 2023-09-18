import { ajax } from './ajax-init'

/** 获取用户信息 */
export const getUserInfo = () => ajax.get<GlobalStore.IUserInfo>('/user/infor', { originalResponse: true })

/** 获取用户菜单权限 */
export const getNavList = (account: string) =>
  ajax.get('/permission/users/menu/tree', {
    params: { account, appId: 'support' },
  })
