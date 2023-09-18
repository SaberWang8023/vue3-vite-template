/** pinia 的 store Key */
export const STORE_KEYS = {
  LAYOUT: 'Layout',
  GLOBAL_STORE: 'Global',
}

/** CommonTable 组件用于判断是否有操作列的 Key */
export const TABLE_COLUMN_OPERATION_KEY = 'OPERATION_COL'

// #region 通用权限
export const RESULT_PERMISSION_KEYS = {
  应发激励确认按钮: '/encourage/result/confirm/btn',
  查看应结算列表: '/encourage/result/list/need',
  查看无需结算列表: '/encourage/result/list/needless',
  导出结果按钮: '/encourage/result/export/btn',
  结果调整按钮: '/encourage/result/adjust/btn',
}

export const SCHEME_PERMISSION_KEYS = {
  方案明细导出: '/encourage/scheme/detail/export',
  方案明细作废: '/encourage/scheme/detail/cancellation',
  方案明细导入: '/encourage/scheme/detail/import',
  // TODO: 动态路由还没做，要根据这个权限做动态路由 --宗纯
  查看方案管理: '/encourage/scheme',
}

// #endregion
