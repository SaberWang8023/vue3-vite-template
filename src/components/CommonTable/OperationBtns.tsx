import { type ColumnType } from 'ant-design-vue/es/table/interface'
import { Button, Space } from 'ant-design-vue'
import { isFunction } from 'utils/index'

interface IProps<Record = any> {
  /** 数据记录 */
  record: Record
  column: ColumnType<Record>
  /**
   * 是否折叠操作栏多余的按钮
   * 默认true, 最多展示三个按钮
   * 如果传入的是数字x，则表示总共展示x个按钮，包括折叠的按钮
   */
  foldOptBtn: number
}

const DEFAULT_FOLD = 3

export const shrinkOptBtnProps = () => ({ type: [Number], default: DEFAULT_FOLD })

const splitOperationBtn = (ele: Array<any>, boundary: number) => {
  return [ele.slice(0, boundary), ele.slice(boundary)] // 使用slice获取截取的副本
}

const renderFoldBtns = (operationButtons: JSX.Element[], boundary: number) => {
  if (!operationButtons.length) {
    return null
  }
  const [btns, foldBtns] = splitOperationBtn(operationButtons, boundary)
  // TODO: 这里的按钮收起还没做呢 --宗纯
  return (
    <Space size={4}>
      {...btns}
      {...foldBtns}
    </Space>
  )
}

const OperationButton = defineComponent<IProps>(
  (props) => {
    const operationButtons = props.column.operationButtons
    const btns = ref<JSX.Element[]>([])
    watchEffect(() => {
      if (Array.isArray(operationButtons)) {
        btns.value = operationButtons.map((btn) => (
          <Button type="link" onClick={btn.clickEvent}>
            {btn.btnText}
          </Button>
        ))
      }
      if (isFunction(operationButtons)) {
        const ele = operationButtons(props.record)
        btns.value = Array.isArray(ele) ? ele : [ele]
      }
    })
    return () => renderFoldBtns(btns.value, props.foldOptBtn)
  },
  {
    name: 'OperationButton',
    props: {
      record: {
        type: Object as PropType<any>,
        required: true,
      },
      column: {
        type: Object as PropType<ColumnType<any>>,
        required: true,
      },
      foldOptBtn: shrinkOptBtnProps(),
    },
  }
)

export default OperationButton
