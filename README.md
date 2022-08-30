# vue3-vite-template

这是一个 Vue3 的初始项目模板，基于 Vue3 + Vite + TypeScript

## Features

- ⚡️ Vue 3, Vite 3, pnpm - 更快速的构建工具，并且限制了只能使用 pnpm，若要更改，请修改 `preinstall` 脚本
- 🍍 使用 [Pinia](https://pinia.vuejs.org/) 作为状态管理工具
- 🗂 基于模块的路由方式，更好的文件组织结构，高内聚，低耦合，支持快速迁移和切换
- 📦 [组件自动引入](./src/components)
- 🦾 完备且强力的 TypeScript 支持
- ⚙️ 完整的 lint 集成（eslint + commitlint）
- 😃 [husky](https://typicode.github.io/husky/#/) + lint-stage

## Coding Style

- 常量用`大写+_`区分
- 常规情况下，一个独立的组件，用文件夹，而不是文件命名，这样有助于一些高阶组件的扩展封装，类似[layouts](./src/layouts)
  - 组件文件(夹)用大写的 Pascal 命名
  - `index.vue`可以小写，其余附带组件大写开头
- 私有变量以 `_`开头

## File Nesting

```json
.
├── .husky                // husky 的一些配置
├── .vscode               // vscode 的一些本地化配置，可以通过编辑内部的配置文件达到 vscode 设置统一的目的
├── public
│   └── favicon.ico
├── src
│   ├── assets            // 静态资源文件夹
│   ├── components        // 公共组件文件夹
│   ├── constant
│   │   └── store-keys.ts // 一些全局的 key 配置文件，确保唯一性
│   ├── layouts           // 布局组件，非公共，只用一次
│   │   ├── LayoutHeader.vue
│   │   ├── LayoutSideBar.vue
│   │   ├── index.vue
│   │   └── store.ts      // 布局组件的 store
│   ├── plugins           // 插件目录
│   │   ├── README.md
│   │   ├── index.ts
│   │   ├── nprogress.ts
│   │   ├── pinia.ts
│   │   └── pwa.ts
│   ├── routers           // 总的路由配置文件夹
│   │   ├── index.ts
│   │   ├── interface.ts
│   │   ├── router-table.ts
│   │   └── utils.ts
│   ├── styles            // 通用样式文件夹
│   │   ├── customize.less
│   │   ├── normalize.less
│   │   └── var.less      // less 全局变量定义处
│   ├── utils             // 工具方法文件夹，内部函数必须可达可测可执行
│   │   ├── README.md
│   │   ├── string.ts
│   │   └── url.ts
│   ├── views
│   │   └── DemoModule    // 模块文件夹（样例）
│   │   │   ├── detail    // 详情页面
│   │   │   ├── list      // 列表页面
│   │   │   └── router.tsx// 模块级路由配置
│   ├── main.ts
│   ├── App.vue
│   └── env.d.ts  // .env文件的TS定义，import.meta.env.XXX 智能提示用
├── tsconfig.json
├── tsconfig.node.json
├── types // 类型文件
│   ├── auto-imports.d.ts
│   ├── components.d.ts
│   ├── index.d.ts
│   └── shims.d.ts
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.ts
```

## TODOs:

- [ ] 根据模块路由自动生成左侧的 nav 菜单
- [ ] 路由集成权限判断
- [ ] 通用的代码生成器
- [ ] 校验 node 版本的工程化配置未集成
- [ ] vitest 单元测试集成
- [ ] lint-staged 配置更加精细化，集成 typecheck
