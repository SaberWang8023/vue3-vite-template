import PageConfig from './plop-tpls/page/prompt.mjs'
import ComponentConfig from './plop-tpls/component/prompt.mjs'
import ModuleConfig from './plop-tpls/module/prompt.mjs'

export default (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  plop.setWelcomeMessage('请选择需要创建的模式：')
  plop.setGenerator('component', ComponentConfig)
  plop.setGenerator('page', PageConfig)
  plop.setGenerator('module', ModuleConfig)
  // plop.setGenerator('store', require('./plop-tpls/store/prompt.cjs'))
}
