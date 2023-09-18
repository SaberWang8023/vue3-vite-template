/** 通用的返回模型 */
declare module ApiBase {
  interface ResponseBase<T = any> {
    /** 错误码 */
    code: number
    /** 返回的数据类型 */
    data: T
    /** 执行结果信息 */
    message: string
  }

  /** 后端返回分页数据的通用模型 */
  interface ResponseList<T = any> {
    /** 当前页 */
    currentPage: number
    /** 一页有几条 */
    itemsPerPage: number
    /**{@deprecated} 信息，这个字段一般没用 */
    message: string
    /** 列表返回数据 */
    resultList: Array<T>
    /** {@deprecated} 成功与否，一般没用 */
    success: boolean
    /** 总的数据条数 */
    totalItems: number
    /** 总页数 */
    totalPages: number
  }
  interface TableHeaderBase {
    /** 是否展示 */
    isShow: boolean
    /** 字段key */
    key: string
    /** 字段名称 */
    name: string
  }
  interface AccountBase {
    /** 账号 */
    account: string
    /** 昵称 */
    alias: string
    /** 姓名 */
    name: string
  }

  interface DepartmentItemBase {
    name: string
    childNodes: DepartmentItemBase[]
  }
}
