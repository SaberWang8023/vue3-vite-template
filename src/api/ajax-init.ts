import { ServiceInstance } from '@esign-design-info/fetch'
import { message } from 'ant-design-vue'

interface AjaxConfigExtras {
  /** 手动处理错误 */
  catchErrors?: boolean
  /** 是否直接取到原始响应，用于手动根据返回 code 处理逻辑 */
  originalResponse?: boolean
  /** 是否不重新登录 */
  noReLogin?: boolean
}

const initHeaders = () => {
  const { VITE_BASE_ENV } = import.meta.env
  const headers: Record<string, any> = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  }
  // 开发、模拟环境才添加 X-Tsign-Service-Group
  if (['project', 'development'].includes(VITE_BASE_ENV) && __GROUP_ID__) {
    headers['X-Tsign-Service-Group'] = __GROUP_ID__
  }

  return headers
}

const errMsgKeys = ['message', 'msg']

export const ajax = new ServiceInstance<AjaxConfigExtras>({
  timeout: 30000,
  withCredentials: true,
  // 默认请求头
  headers: initHeaders(),
  // 默认的请求url
  baseURL: import.meta.env.VITE_SUPPORT_URL,
  // 公共的请求响应拦截
  interceptors: {
    requestInterceptor: (config: any) => {
      return config
    },
    requestInterceptorCatch: (error: any) => {
      return error
    },
    // 请求返回值拦截
    responseInterceptor: (res: { data: any; config: any }) => {
      const { data, config } = res
      if (data instanceof Blob) {
        return res
      }
      if (data.errCode === 10001) {
        window.location.href = data.data.loginUrl
        return Promise.reject(new Error('登录过期,请重新登录'))
      }

      if ((config as any).originalResponse) {
        return data
      }
      if (data.code !== 0) {
        let errMsg: string = '未知错误'
        if (!(config as any).catchErrors) {
          for (const key of errMsgKeys) {
            if (data[key]) {
              errMsg = data[key]
              break
            }
          }
          void message.error(errMsg)
        }
        return Promise.reject(new Error(errMsg))
      }
      return data.data
    },
    responseInterceptorCatch: (error: { config: any }) => {
      const { config } = error
      const errorMsg = '网络异常，请检查你的网络状况！'
      if (config.catchErrors) {
        return Promise.reject(new Error(errorMsg))
      }
      void message.error(errorMsg)
    },
  },
  baseUrlMap: {
    support: {
      url: import.meta.env.VITE_SUPPORT_URL ?? '',
      interceptors: {
        responseInterceptor(res: { data: any }) {
          return res.data
        },
      },
    },
  },
})

export const formUrlHeaders = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
