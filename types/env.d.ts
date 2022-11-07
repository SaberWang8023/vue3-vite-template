/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 编译模式
  MODE: 'dev' | 'test' | 'sml' | 'prod'

  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
