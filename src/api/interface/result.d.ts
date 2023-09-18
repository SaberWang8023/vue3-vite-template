declare module ResultApi {
  interface FetchResultDetailReq {
    /** 激励类型：1-金额，2-积分 */
    commissionType: number
    /** 账户 */
    account?: string
    /** 是否确认 */
    confirmed?: boolean
    /** 结算时间 */
    cycle?: string
    /** 部门 */
    department?: Array<any>
    /*** 是否需要结算  */
    needCalc?: boolean
    pageNum: number
    pageSize: number
  }
  type FetchResultDetailRes = ApiBase.ResponseList<any>

  type FetchResultHeaderRes = Array<ApiBase.TableHeaderBase & { ruleId: number | null }>

  type FetchResultHeaderReq = Omit<FetchResultDetailReq, 'pageNum' | 'pageSize'>

  type FetchResultAccountRes = Array<ApiBase.AccountBase>

  type FetchResultDepartmentRes = Array<ApiBase.DepartmentItemBase>

  interface ResultAdjustReq {
    /** 调整账号 */
    account: string
    /** 调整金额 */
    amount: number
    /** 激励类型：1-金额，2-积分 */
    commissionType: number
    /** 计算时间,例如2023-Q1 */
    cycle: string
    /** 调整原因 */
    desc: string
    /** 是否需要结算 */
    needCalc: boolean
  }

  interface ConfirmResultReq {
    /** 提成类型:1-金钱，2-积分 */
    commissionType: number
    /** 结算时间 */
    cycle: string
    /** 是否需要结算 */
    needCalc: boolean
  }

  type ExportResultReq = FetchResultHeaderReq
}
