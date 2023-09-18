/** 激励提成接口模型 */
declare module CommissionApi {
  interface FetchDetailReq {
    /** 账户，账号拼音 */
    account?: string
    /** 结算时间 */
    cycle: string
    /** 部门 */
    departments?: Array<string>
    pageNum: number
    pageSize: number
    /** 方案ID */
    ruleId?: number
  }

  type FetchDetailRes = ApiBase.ResponseList<any>
  type FetchTableHeaderRes = ApiBase.TableHeaderBase

  interface SetValidStatusReq {
    /** 是否作废 */
    status: number
    /** 方案ID */
    ruleId: number
    /** 记录ID */
    id: number
  }

  interface CheckExcelRes {
    checkResult: boolean
    url: null | string
  }

  type ExportResultReq = Omit<FetchDetailReq, 'pageNum' | 'pageSize'>
}
