/**
 * 激励提成接口
 * Author: 宗纯
 * CreateTime: 2023-08-01
 * Description:
 *
 */

import { ajax, formUrlHeaders } from './ajax-init'

/** 激励明细查询 */
export const fetchCommissionDetail = (data: CommissionApi.FetchDetailReq) =>
  ajax.post<CommissionApi.FetchDetailRes>('/encourage/api/v1/commission/detail', { data })

/** 获取激励方案详情的表头 */
export const fetchTableHeader = (ruleId: number) =>
  ajax.get<CommissionApi.FetchTableHeaderRes[]>('/encourage/api/v1/commission/header', { params: { ruleId } })

/** 设置是否作废 */
export const setValidStatus = (data: CommissionApi.SetValidStatusReq) =>
  ajax.post('/encourage/api/v1/commission/setValidStatus', { data, headers: { ...formUrlHeaders } })

/** 下载模板 */
export const downloadTemplate = (ruleId: number, fileName = '') =>
  ajax.download('/encourage/api/v1/commission/downloadTemplate', {
    config: {
      params: { ruleId },
      catchFn: (err: any) => {
        console.error('(╯°Д°)╯︵ ┻━┻', err)
      },
    },
    methods: 'get',
    getName: () => `${fileName}导入模版.xlsx`,
  })

/** 校验excel */
export const checkExcel = (ruleId: number, fileId: string) =>
  ajax.get<CommissionApi.CheckExcelRes>('/encourage/api/v1/commission/checkExcel', { params: { ruleId, fileId } })

/** 激励方案结果导出 */
export const exportResult = (data: CommissionApi.ExportResultReq) => ajax.post('/encourage/api/v1/commission/exportResult', { data })

/** 导入Excel */
export const doImport = (ruleId: number, fileId: string) =>
  ajax.get('/encourage/api/v1/commission/doImport', { params: { ruleId, fileId } })
