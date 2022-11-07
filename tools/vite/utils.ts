import { type ViteEnv } from '../../types/index'
export const parseEnv = (env: Record<string, string>) => {
  const result: Partial<ViteEnv> = {}
  Object.entries(env).forEach(([key, value]) => {
    let relVal: unknown = value.replace(/\\n/g, '\n')

    if (typeof relVal === 'string') {
      if (['true', 'false'].includes(relVal)) {
        relVal = JSON.parse(relVal)
      } else if (/([1-9]\d*\.?\d*)|(0\.\d*[1-9]/.test(relVal)) {
        relVal = parseFloat(relVal)
      }
    }

    result[key] = relVal
  })

  return result as ViteEnv
}
