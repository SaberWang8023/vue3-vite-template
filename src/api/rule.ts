/**
 * 激励方案接口
 * Author: 宗纯
 * CreateTime: 2023-08-01
 * Description:
 *
 */
import { ajax } from './ajax-init'

/** 获取激励方案列表 */
export const fetchRuleList = (data: RuleApi.FetchRuleListReq) => ajax.post<RuleApi.FetchRuleListRes>('/encourage/api/v1/rule/list', { data })

/** 获取方案的结算时间 */
export const fetchRuleCycle = (ruleId: number) => ajax.get<string[]>('/encourage/api/v1/rule/cycles', { params: { ruleId } })

/** 获取方案详情 */
export const fetchRuleDetail = (ruleId: number) => ajax.get<RuleApi.FetchRuleDetailRes>('/encourage/api/v1/rule/detail', { params: { ruleId } })

/** 查询激励人员 */
export const fetchAccount = (ruleId: number, cycle: string, query: string) =>
  ajax.get<RuleApi.FetchAccountRes>('/encourage/api/v1/rule/account', { params: { ruleId, cycle, query } })

/** 查询激励部门 */
export const fetchDepartment = (ruleId: number, cycle: string) =>
  ajax.get<RuleApi.FetchDepartmentRes>('/encourage/api/v1/rule/department', { params: { ruleId, cycle } })
