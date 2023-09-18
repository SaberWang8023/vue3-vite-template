<script lang="ts" setup>
import ListLayout from '@/layouts/ListLayout.vue'
import Search from './components/Search/index.vue'
import { FormOutlined } from '@ant-design/icons-vue'
import { TabMap } from './providers'
import { confirmResult, fetchResultDetail, fetchResultHeader, resultExport } from '@/api/result'
import { Button, message, Modal, notification, type TableProps } from 'ant-design-vue'
import AdjustDialog from './components/AdjustDialog/index.vue'
import { useRequest } from 'vue-request'
import type { NotificationArgsProps } from 'ant-design-vue/es/notification'
import { useTableData } from '@/hooks/useTableData'
import { getRouteName } from '@/routers/attach-router-names'

type SearchComponentType = Required<InstanceType<typeof Search>>
type OnSearch = SearchComponentType['onSearch']
type SearchModel = Parameters<OnSearch>[0]
type RuleColumns = Array<{ ruleId: number; key: string }>

defineOptions({ name: 'ResultList' })

const route = useRoute()
// 是否需要结算
const needCalc = route.name === getRouteName(TabMap['应结算'])
const uiState = shallowReactive({
  dialogVisible: false,
  currentRecord: undefined as Record<string, any> | undefined,
  searchModel: {} as SearchModel,
  columns: [] as Required<TableProps>['columns'],
  ruleColumns: [] as RuleColumns, // 方案名称动态列，需要根据此判断是否能跳转详情
  loading: false,
})

const { runAsync: fetchHeader } = useRequest(fetchResultHeader, {
  onSuccess: (headerData) => {
    if (!Array.isArray(headerData)) return
    const columns: TableProps['columns'] = []
    const ruleColumns: RuleColumns = []
    const minWidth = 100
    headerData.forEach((item) => {
      if (item.key !== 'id') {
        if (item.ruleId) {
          ruleColumns.push({ ruleId: item.ruleId, key: item.key })
        }

        const width = item.name.length * 30
        columns.push({
          title: item.name,
          dataIndex: item.key,
          width: width < minWidth ? minWidth : width,
        })
      }
    })
    uiState.columns = columns
    uiState.ruleColumns = ruleColumns
  },
})

const { runAsync: fetchTableData, refresh, loading, changePagination, dataSource, pagination } = useTableData(fetchResultDetail)

const { runAsync: confirm } = useRequest(confirmResult, { onSuccess: () => {} })

const handleSearch: OnSearch = async (searchModel) => {
  uiState.searchModel = searchModel
  await fetchHeader({ ...searchModel, needCalc })
  if (uiState.columns.length === 0) return
  await fetchTableData({ ...searchModel, needCalc, pageNum: pagination.value.current, pageSize: pagination.value.pageSize })
}

const handleAdjust = (record: Record<string, any>) => {
  uiState.dialogVisible = true
  uiState.currentRecord = record
}

const handleTableChange: TableProps['onChange'] = ({ current = 1, pageSize = 10 }) => {
  changePagination(current, pageSize)
}

const { hasPermission } = useGlobalStore()

const showConfirmBtn = computed(() => {
  const date = new Date()
  const day = date.getDate()
  return day >= 8 && day <= 15 && hasPermission(RESULT_PERMISSION_KEYS['应发激励确认按钮'])
})

const handleConfirmResult = () => {
  const confirmResult = async () => {
    const { commissionType, cycle } = uiState.searchModel
    if (cycle === undefined) {
      message.error('请选择正确的计算时间')
      return
    }
    const res = await confirm({ commissionType, cycle, needCalc })
    if (res) {
      message.success('应发激励确认成功！')
      refresh()
    }
  }

  Modal.confirm({
    title: '确认应发激励',
    content: '你将确认所有归你管辖的激励结果，确认后不可取消，请仔细核对后再确定',
    onOk: confirmResult,
    okText: '确认',
    cancelText: '取消',
  })
}

const handleExport = async () => {
  const res = await resultExport({ ...uiState.searchModel, needCalc })
  const key = `open${Date.now()}`
  const notificationCfg: NotificationArgsProps = {
    message: '创建导出任务成功',
    description: '请留意稍后的钉钉消息通知',
    duration: 0,
    key,
    btn: () =>
      h(
        Button,
        {
          type: 'primary',
          size: 'small',
          onClick: () => notification.close(key),
        },
        { default: () => '我知道了' }
      ),
  }
  if (res) {
    notification.success(notificationCfg)
  } else {
    notificationCfg.message = '创建导出任务失败'
    notificationCfg.description = '请联系激励系统管理员或者询问数智化小秘'
    notification.error(notificationCfg)
  }
}
</script>

<template>
  <ListLayout>
    <template #search>
      <Search @search="handleSearch" />
    </template>
    <template #default>
      <template v-if="uiState.columns.length === 0">
        <AEmpty description="暂无数据" />
      </template>
      <template v-else>
        <CommonTable
          :columns="uiState.columns"
          :dataSource="dataSource"
          :scroll="{ x: 1300, y: 700 }"
          :loading="loading"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <template #headerRight>
            <ASpace :size="8">
              <AButton v-if="showConfirmBtn" type="primary" @click="handleConfirmResult">应发激励确认无误</AButton>
              <AButton v-if="hasPermission(RESULT_PERMISSION_KEYS['导出结果按钮'])" @click="handleExport">导出结果</AButton>
            </ASpace>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-for="ruleCol in uiState.ruleColumns" :key="ruleCol.key">
              <template v-if="column.dataIndex === ruleCol.key">
                <RouterLink
                  :to="{
                    name: getRouteName(ROUTER_PREFIX.SCHEME, 'detail'),
                    params: {
                      ruleId: ruleCol.ruleId,
                    },
                    query: {
                      cycle: uiState.searchModel.cycle,
                      account: record.account,
                    },
                  }"
                >
                  {{ record[ruleCol.key] ?? TABLE_CELL_EMPTY }}
                </RouterLink>
              </template>
            </template>
            <template v-if="column.dataIndex === 'adjust'">
              <ASpace :size="8">
                <span>{{ record.adjust?.amount ?? TABLE_CELL_EMPTY }}</span>
                <span v-if="hasPermission(RESULT_PERMISSION_KEYS['结果调整按钮'])" @click="handleAdjust(record)">
                  <FormOutlined />
                </span>
              </ASpace>
            </template>
          </template>
        </CommonTable>
        <AdjustDialog
          v-model:visible="uiState.dialogVisible"
          :record="uiState.currentRecord"
          :needCalc="needCalc"
          :commissionType="uiState.searchModel.commissionType"
          :refresh="refresh"
        />
      </template>
    </template>
  </ListLayout>
</template>
