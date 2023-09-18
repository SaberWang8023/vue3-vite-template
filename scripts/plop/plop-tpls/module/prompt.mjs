import { validate, VIEW_BASE } from '../../utils.mjs'

const ADD_MANY_BASE = 'plop-tpls/module'

/** @type {import('plop').PlopGeneratorConfig} */
export default {
  description: '创建模块',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入模块英文名',
      validate: validate('模块英文名不能为空'),
    },
    {
      type: 'input',
      name: 'nameCn',
      message: '请输入模块中文名，用于左侧菜单展示',
      validate: validate('模块中文名不能为空'),
    },
  ],
  actions: (data) => {
    if (data === undefined) return []

    const actions = [
      {
        type: 'modify',
        path: 'src/constant/router-names.ts',
        template: `/** {{nameCn}} */
  {{constantCase name}}: '{{kebabCase name}}',
  $1`,
        // 不要随随便便改这个正则！！！
        pattern: /(\/\/ Don't delete this line!!!)/,
      },
      {
        type: 'addMany',
        destination: `${VIEW_BASE}/{{kebabCase name}}`,
        base: ADD_MANY_BASE,
        templateFiles: `${ADD_MANY_BASE}/*.hbs`,
        data: {
          name: `${data.name}`,
          nameCn: `${data.nameCn}`,
        },
      },
    ]
    return actions
  },
}
