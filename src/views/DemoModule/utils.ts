import { calculateAbsoluteRouter } from '@/routers/utils'
import curry from 'lodash.curry'
import { ROUTER_PREFIX } from './constant'

export const generateRedirectURL = curry(calculateAbsoluteRouter)(ROUTER_PREFIX)
