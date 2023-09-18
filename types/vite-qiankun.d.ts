type QiankunLifecycle = {
  mount: (props: any) => void
  bootstrap:()=>void
  update:()=>void
  unmount:()=>void
}

declare module "vite-plugin-qiankun/dist/helper" {
 export const  qiankunWindow: Window
  export const renderWithQiankun:(p:QiankunLifecycle)=>void
}

