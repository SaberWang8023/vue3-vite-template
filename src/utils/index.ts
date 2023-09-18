export const isFunction = (val: any): val is (...args: any) => any => typeof val === 'function'

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

export const isNumber = (val: any): val is number => typeof val === 'number'
