declare module 'ant-design-vue/es/table' {
  import { type ColumnType } from 'ant-design-vue/es/table'
  export interface ColumnType {
    processor?: (record: any, text: string | number) => string | undefined | null
    operationButtons?: OperationButton
  }
}

export type OperationButtonJsx<Record = any> = (record: Record) => JSX.Element | JSX.Element[]

export interface OperationButtonObj<Record = any> {
  btnText: string
  clickEvent: (record: Record) => void
}

export type OperationButton = OperationButtonJsx | OperationButtonObj[]
