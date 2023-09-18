declare module GlobalStore {
  interface IGlobalStore {
    userInfo: DeepReadonly<IUserInfo> | undefined
    menuTree: DeepReadonly<IMenuTree> | undefined
    permissionSet: DeepReadonly<Set<string>> | undefined
  }

  interface IUserInfo {
    hireDate: string
    code: string
    mail: string
    mobile: string
    groupList: Array<{
      groupId: string
      groupName: string
      parentId: string
      parentName?: string
      defaultManager?: string
    }>
    env: string
    userId: string
    workNum: string
    defaultGroup: {
      groupId: string
      groupName: string
      parentId: string
    }
    name: string
    alias: string
    id: string
    account: string
    job: string
    iss: string
    sub: string
    isLeader: boolean
  }

  interface IMenuItem {
    name: string
    type: any
    creator: any
    createTime: string
    id: number
    url: string
    component?: string
    resourceType: string
    index: number
    check: boolean
    enable: number
    resources: IMenuItem[]
  }
  type IMenuTree = Array<IMenuItem>
}
