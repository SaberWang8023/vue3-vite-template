import { type RangePicker } from 'ant-design-vue'
import dayjs from 'dayjs'

interface Option {
  label: string | number
  value: number | string
  [key: string]: any
}
/**
 * 将枚举转换为Select等组件常用的Options
 * @param enumObj 枚举类型
 * @param valueType 要生成Option的value的类型，默认为number
 * @returns Options
 */
export function enumToOptions<T extends Record<string, number> | Record<number, string>>(
  enumObj: T,
  valueType: 'string' | 'number' = 'number'
): Option[] {
  return (
    Object.entries<string | number>(enumObj)
      // eslint-disable-next-line valid-typeof
      .filter(([, value]) => typeof value === valueType)
      .map(([key, value]) => ({
        label: key,
        value,
      }))
  )
}

/**
 * 通用的格式化日期
 * @param date 要格式化的日期
 * @param foramt 格式化的格式
 * @returns 返回格式化之后的字符串
 */
export function formatDate(date: dayjs.ConfigType, foramt = 'YYYY-MM-DD') {
  if (date === null) {
    return undefined
  }
  return dayjs(date).format(foramt)
}

/**
 * 将日期范围转换为时间戳范围，并且将日期范围的第0位转换为当天0点的时间戳，第1位转换为当天23:59:59的时间戳
 * @param date 一个日期范围
 * @returns 返回一个时间戳范围
 */
export function dateRangeToTimestamp(date: InstanceType<typeof RangePicker>['value'] | undefined) {
  if (!Array.isArray(date) || date.length !== 2) {
    return []
  }
  // 将date的第0位转换为当天0点的毫秒级时间戳
  const start = dayjs(date[0]).startOf('day').valueOf()
  // 将date的第1位转换为当天23:59:59的毫秒级时间戳
  const end = dayjs(date[1]).endOf('day').valueOf()
  return [start, end]
}
