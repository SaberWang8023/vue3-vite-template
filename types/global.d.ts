import { type SelectProps } from 'ant-design-vue'
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: boolean
  }

  type BaseTypeString = 'string' | 'number' | 'boolean' | 'symbol' | 'bigint' | 'object' | 'undefined' | 'function'

  type AnyObject = Record<string, any>

  type SelectPropsOptions = Required<SelectProps>['options']
}
