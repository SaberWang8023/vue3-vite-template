declare module RuleApi {
  interface FetchRuleListReq {
    /** 方案编号 */
    code?: string
    /** 计算周期,1-自然月,2-自然季度,3-自然半年,4-自然年 */
    cycle?: number
    /** 方案名称 */
    name?: string
    /** 是否计入应发激励：0-否，1-是 */
    needCalc?: number
    pageNum: number
    pageSize: number
    /** 生效结束时间 */
    startDateEnd?: number
    /** 生效开始时间 */
    startDateStart?: number
    /** 状态：0-未生效，1-已生效 */
    status?: number
    /** 激励类型,1-金钱,2-积分 */
    type?: number
  }

  interface FetchRuleListItem {
    canBeImport: boolean
    canBeNullify: boolean
    code: string
    createDate: string
    cycle: number
    department: string
    desc: string
    dimension: number
    id: number
    isDeleted: boolean
    modifyDate: string
    name: string
    needCalc: number
    startDate: string
    status: number
    type: number
  }

  type FetchRuleListRes = ApiBase.ResponseList<FetchRuleListItem>

  interface FetchRuleDetailRes {
    /** 激励结果可以导入 */
    canBeImport: boolean
    /** 激励结果可以作废 */
    canBeNullify: boolean
    /** 方案编号 */
    code: string
    /** 创建时间 */
    createDate: string
    /** 计算周期,1-自然月,2-自然季度,3-自然半年,4-自然年 */
    cycle: number
    /** 应用部门列表 */
    department: string
    /** 规则说明 */
    desc: string
    /** 维度: 1-业绩，2-项目，3-合同，4-员工 */
    dimension: number
    /** 方案id */
    id: number
    /** 是否删除 */
    isDeleted: boolean
    /** 修改时间 */
    modifyDate: string
    /** 方案名称 */
    name: string
    /** 是否计入应发激励：0-否，1-是 */
    needCalc: number
    /** 开始生效时间 */
    startDate: string
    /** 状态：0-未生效，1-已生效 */
    status: number
    /** 激励类型,1-金钱,2-积分 */
    type: number
  }

  type FetchAccountRes = Array<ApiBase.AccountBase>

  type FetchDepartmentRes = Array<ApiBase.DepartmentItemBase>
}
