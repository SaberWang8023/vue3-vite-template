interface MetaBase {
  /** 模块名称的key */
  title: string
  /** 公共权限验证方法，有这个函数会忽略其他的验证 */
  authorize?: () => boolean
}

export interface RouterConfig {
  children?: RouterConfig[]
  meta?: FirstLevelMeta | SecondLevelMeta | ThreeLevelMeta
}

export interface FirstLevelMeta extends MetaBase {
  /** 一级模块的图标名字（要跟图片名一模一样） */
  icon: string
}

export type SecondLevelMeta = MetaBase

export interface ThreeLevelMeta extends MetaBase {
  /** 可选字段，进入该页面需要的权限，如果是&&权限则写成二维数组 */
  roles?: Array<string | string[]>
  /** 可选字段，是默认子节点路由（二级模块至少要有一个默认节点，有默认节点才能进该二级模块） |false */
  isDefault?: boolean
}
