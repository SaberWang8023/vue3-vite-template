/**
 * 激励结果接口
 * Author: 宗纯
 * CreateTime: 2023-08-03
 * Description:
 *
 */

import { ajax, formUrlHeaders } from './ajax-init'

/** 获取激励结果表头 */
export const fetchResultHeader = (data: ResultApi.FetchResultHeaderReq) =>
  ajax.post<ResultApi.FetchResultHeaderRes>('/encourage/api/v1/result/header', { data })

/** 获取激励结果列表数据 */
export const fetchResultDetail = (data: ResultApi.FetchResultDetailReq) =>
  ajax.post<ResultApi.FetchResultDetailRes>('/encourage/api/v1/result/detail', { data })
/** 查询激励结果的人员 */
export const fetchResultAccount = (cycle: string, query: string) =>
  ajax.get<ResultApi.FetchResultAccountRes>('/encourage/api/v1/result/account', { params: { cycle, query } })

/** 查询激励结果部门 */
export const fetchResultDepartment = (cycle: string) =>
  ajax.get<ResultApi.FetchResultDepartmentRes>('/encourage/api/v1/result/department', { params: { cycle } })

/** 查询所有激励结果周期 */
export const fetchResultAvailableCycle = (cycleType: number) =>
  ajax.get<string[]>('/encourage/api/v1/result/getAvailableCycle', { params: { cycleType } })

/** 激励结果调整 */
export const resultAdjust = (data: ResultApi.ResultAdjustReq) => ajax.post<boolean>('/encourage/api/v1/result/adjust', { data })

/** 激励结果确认 */
export const confirmResult = (data: ResultApi.ConfirmResultReq) => ajax.post<boolean>('/encourage/api/v1/result/confirm', { data })

/** 激励结果导出 */
export const resultExport = (data: ResultApi.ExportResultReq) => ajax.post<boolean>('/encourage/api/v1/result/exportResult', { data })

/** 取消调整激励结果 */
export const cancelAdjust = (adjustId: number) =>
  ajax.post<boolean>('/encourage/api/v1/result/cancelAdjust', {
    data: { adjustId },
    headers: { ...formUrlHeaders },
  })
