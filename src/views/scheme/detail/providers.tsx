import { fetchTableHeader, setValidStatus } from '@/api/commission'
import { fetchRuleDetail } from '@/api/rule'
import { Button, Popconfirm, message, type TableProps } from 'ant-design-vue'
import { useRequest } from 'vue-request'

enum STATUS {
  未作废 = 0,
  已作废 = 1,
}

/**
 * 获取操作列
 * @param canBeNullify 是否可以作废
 * @returns
 */
export const getOperationCol = (ruleId: number, canBeNullify = false, refresh: () => void, hasPermission: (p: string) => boolean) => {
  if (!canBeNullify || !hasPermission(SCHEME_PERMISSION_KEYS['方案明细作废'])) {
    // TODO: 一期不做分配功能，不能作废的方案，不需要操作列 --宗纯
    return []
  }

  const handleValidStatus = async (record: any) => {
    let status = STATUS['已作废']
    if (record.validStatus === STATUS['已作废']) {
      status = STATUS['未作废']
    }
    const res = await setValidStatus({ id: record.id, ruleId, status })
    if (res) {
      void message.success('操作成功')
      refresh()
    }
  }

  const operationColumn: TableProps['columns'] = [
    {
      title: '操作',
      dataIndex: TABLE_COLUMN_OPERATION_KEY,
      width: 150,
      align: 'center',
      fixed: 'right',
      operationButtons: (record) => {
        let btnText = ''
        let tips = ''
        let style = ''
        if (record.validStatus === STATUS['已作废']) {
          tips = '恢复'
          btnText = '已作废'
          style = 'color: rgba(0, 0, 0, 0.25)'
        } else {
          btnText = tips = '作废'
        }

        return (
          <Popconfirm
            title={`你确定要${tips}这行内容吗？`}
            // description={`${tips}后计算结果明天更新`}
            placement="topRight"
            onConfirm={() => {
              void handleValidStatus(record)
            }}>
            <Button type="link" style={style}>
              {btnText}
            </Button>
          </Popconfirm>
        )
      },
    },
  ]
  return operationColumn
}

export enum TabPane {
  计算结果 = 1,
  基础信息 = 2,
}

/**
 * 获取方案详情
 * @param ruleId 方案ID
 * @returns
 */
export const useFetchRuleDetail = (ruleId: number) => useRequest(fetchRuleDetail, { manual: false, defaultParams: [ruleId] })

/**
 * 获取表头
 * @param ruleId 方案ID
 * @returns
 */
export const useFetchTableHeader = (ruleId: number) => {
  const { data } = useRequest(fetchTableHeader, { manual: false, defaultParams: [ruleId] })
  return data
}
