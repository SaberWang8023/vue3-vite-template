import { enumToOptions } from 'utils/convert'
import { STATUS } from '../../constant'

/** 搜索选项类型枚举 */
export enum SEARCH_TYPE {
  '方案名称' = 1,
  '规则编号' = 2,
}

export const SEARCH_TYPE_OPTIONS: SelectPropsOptions = enumToOptions(SEARCH_TYPE)

/** 状态 */
export const STATUS_OPTIONS: SelectPropsOptions = enumToOptions(STATUS)
