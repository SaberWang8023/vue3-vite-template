import { enumToOptions } from 'utils/convert'

/**
 * 激励类型枚举
 */
export enum ENCOURAGE_TYPE {
  '现金' = 1,
  '积分' = 2,
}

export const ENCOURAGE_TYPE_OPTIONS: SelectPropsOptions = enumToOptions(ENCOURAGE_TYPE)

/**
 * 通用的“是”和“否”枚举
 */
export enum YES_OR_NO {
  '是' = 1,
  '否' = 0,
}

export const YES_OR_NO_OPTIONS: SelectPropsOptions = enumToOptions(YES_OR_NO)

/**
 * 计算周期
 */
export enum CYCLE {
  '自然月' = 1,
  '自然季度' = 2,
  '自然半年' = 3,
  '自然年' = 4,
}

export const CYCLE_OPTIONS: SelectPropsOptions = enumToOptions(CYCLE)
