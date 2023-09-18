import { getRouteName } from '@/routers/attach-router-names'
import { Button, type TableProps } from 'ant-design-vue'
import { formatDate } from 'utils/convert'

/**
 * 生效状态
 */
export enum STATUS {
  '待生效' = 0,
  '生效中' = 1,
}

export const useColumns: () => TableProps['columns'] = () => {
  const router = useRouter()

  return [
    {
      title: '方案名称',
      dataIndex: 'name',
      width: 250,
      align: 'center',
    },
    {
      title: '规则编号',
      dataIndex: 'code',
      width: 100,
      align: 'center',
    },
    {
      title: '计算周期',
      dataIndex: 'cycle',
      width: 150,
      align: 'center',
      processor: (_, text) => {
        return CYCLE[text as number]
      },
    },
    {
      title: '激励类型',
      dataIndex: 'type',
      width: 150,
      align: 'center',
      processor: (_, text) => {
        return ENCOURAGE_TYPE[text as number]
      },
    },
    {
      title: '是否计入应发激励',
      dataIndex: 'needCalc',
      width: 150,
      align: 'center',
      processor: (_, text) => {
        return YES_OR_NO[text as number]
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      align: 'center',
      processor: (_, text) => {
        return STATUS[text as number]
      },
    },
    {
      title: '生效日期',
      dataIndex: 'startDate',
      width: 150,
      align: 'center',
      processor: (_, text) => {
        return formatDate(text)
      },
    },
    {
      title: '方案更新日期',
      dataIndex: 'modifyDate',
      width: 150,
      align: 'center',
      processor: (_, text) => {
        return formatDate(text)
      },
    },
    {
      title: '操作',
      dataIndex: TABLE_COLUMN_OPERATION_KEY,
      width: 150,
      align: 'center',
      fixed: 'right',
      operationButtons: (record) => {
        const btns = []

        if (record.supported) {
          btns.push(
            <Button
              type="link"
              onClick={() => {
                void router.push({ name: getRouteName(ROUTER_PREFIX.SCHEME, 'detail'), params: { ruleId: record.id } })
              }}>
              查看
            </Button>
          )
        }

        // if (record.status === STATUS['生效中']) {
        //   btns.push(
        //     <Popconfirm title="你确定要停止这个方案吗" onConfirm={() => {}}>
        //       <Button type="link">停止</Button>
        //     </Popconfirm>
        //   )
        // } else {
        //   btns.push(
        //     <Popconfirm title="你确定要停止这个方案吗" onConfirm={() => {}}>
        //       <Button type="link">删除</Button>
        //     </Popconfirm>,
        //     <Popconfirm title="你确定要生效这个方案吗" onConfirm={() => {}}>
        //       <Button type="link">生效</Button>
        //     </Popconfirm>
        //   )
        // }
        return btns
      },
    },
  ]
}
