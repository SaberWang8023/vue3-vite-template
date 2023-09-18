import { getRouteMapKey } from '@/routers/attach-router-names'
export const TabMap = {
  应结算: getRouteMapKey(ROUTER_PREFIX.RESULT, 'list', 'need'),
  无需结算: getRouteMapKey(ROUTER_PREFIX.RESULT, 'list', 'needless'),
}

/** 激励状态 */
export enum ResultStatus {
  '未确认' = 0,
  '已确认' = 1,
}
