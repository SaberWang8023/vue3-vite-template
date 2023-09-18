import { relative } from 'node:path'
import { getFolder, validate, VIEW_BASE } from '../../utils.mjs'

const DEFAULT_FILE_NAME = 'index'

/** @type {import('plop').PlopGeneratorConfig} */
export default {
  description: '创建组件',
  prompts: [
    {
      type: 'confirm',
      name: 'isGlobal',
      message: '是否为全局组件',
      default: false,
    },
    {
      type: 'list',
      name: 'path',
      message: '请选择组件创建目录',
      choices: getFolder(VIEW_BASE),
      when: (answers) => {
        return !answers.isGlobal
      },
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入组件名称',
      validate: validate('组件名称不能为空'),
    },
    {
      type: 'input',
      name: 'fileName',
      message: `请输入文件名（默认${DEFAULT_FILE_NAME}.vue）`,
      default: DEFAULT_FILE_NAME,
    },
  ],
  actions: (data) => {
    if (data === undefined) return []
    const pathArr = ['src', 'components', '{{properCase name}}', `${data.fileName}.vue`]

    const componentNameArr = [data.name]

    if (!data.isGlobal) {
      pathArr[0] = data.path
      const relativePath = relative(VIEW_BASE, data.path)
      componentNameArr.unshift(relativePath)
      if (data.fileName !== DEFAULT_FILE_NAME) {
        componentNameArr.push(data.fileName)
      }
    }

    const actions = [
      {
        type: 'add',
        path: pathArr.join('/'),
        templateFile: 'plop-tpls/component/index.hbs',
        data: { componentName: componentNameArr.join('-') },
      },
    ]
    return actions
  },
}
