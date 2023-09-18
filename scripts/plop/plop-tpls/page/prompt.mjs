import { relative } from 'node:path'
import { getFolder, validate, VIEW_BASE } from '../../utils.mjs'

/** @type {import('plop').PlopGeneratorConfig} */
export default {
  description: '创建页面',
  prompts: [
    {
      type: 'list',
      name: 'path',
      message: '请选择页面创建目录',
      choices: getFolder(VIEW_BASE, false),
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入页面英文名称',
      validate: validate('英文名称不能为空'),
    },
    {
      type: 'input',
      name: 'nameCn',
      message: '请输入页面中文名称',
      validate: validate('中文名称不能为空'),
    },
  ],
  actions: (data) => {
    if (data === undefined) return []

    const componentNameArr = [data.name]
    const relativePath = relative(VIEW_BASE, data.path)
    componentNameArr.unshift(relativePath)
    const actionsData = {
      name: `${data.name}`,
      nameCn: `${data.nameCn}`,
      componentName: componentNameArr.join('-'),
    }
    const actions = [
      {
        type: 'add',
        path: `${data.path}/{{kebabCase name}}/index.vue`,
        templateFile: 'plop-tpls/page/index.hbs',
        data: actionsData,
      },
      {
        type: 'modify',
        path: `${data.path}/router.ts`,
        template: `{
      path: '{{kebabCase name}}',
      component: () => import('./{{kebabCase name}}/index.vue'),
      meta: {
        title: '{{nameCn}}',
      },
    },
    $1`,
        // 不要随随便便改这个正则！！！
        pattern: /(\/\/ Don't delete this line!!!)/,
        data: actionsData,
      },
    ]
    return actions
  },
}
