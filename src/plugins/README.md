# pugins

定制的插件系统，只需要在此目录中实现了以下代码，相关的插件就会自动安装到 Vue 全局下

```ts
import { type Plugin } from 'vue'
import { type VuePluginOptions } from 'types'

export const install: Plugin = (app, options: VuePluginOptions) => {
  // do something
}
```
