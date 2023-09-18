import { readdirSync, lstatSync } from 'node:fs'
function getFolder(path) {
  const components = []
  const files = readdirSync(path)
  files.forEach(function (item) {
    const stat = lstatSync(`${path}/${item}`)
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(`${path}/${item}`)
      components.push(getFolder(`${path}/${item}`))
    }
  })
  return components
}
module.exports = {
  description: '创建全局模块化状态',
  prompts: [
    {
      type: 'list',
      name: 'path',
      message: '请选择页面创建目录',
      choices: getFolder('src/store'),
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入模块名称',
      validate: (v) => {
        if (!v || v.trim === '') {
          return '模块名称不能为空'
        } else {
          return true
        }
      },
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: `${data.path}/{{camelCase name}}/index.ts`,
        templateFile: 'plop-tpls/store/index.hbs',
      },
      {
        type: 'add',
        path: `${data.path}/{{camelCase name}}/types.ts`,
      },
    ]
    return actions
  },
}
