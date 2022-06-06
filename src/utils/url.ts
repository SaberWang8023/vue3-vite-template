/**
 * 操作URL查询参数
 */
export class UrlParamsOperating {
  params: URLSearchParams
  /**
   * 构造函数，所以用这个方法的地方需要自行实例化
   */
  constructor() {
    this.params = new URLSearchParams(window.location.search.replace(/\?/gi, ''))
  }
  /**
   * 判断URL上是否含有参数
   * @param {string} name 参数名
   */
  has(name: string) {
    return this.params.has(name)
  }
  /**
   * 获取URL上参数值
   * @param {string} name 参数名
   */
  get(name: string) {
    return this.params.get(name)
  }
}
