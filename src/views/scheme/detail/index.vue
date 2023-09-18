<script lang="ts" setup>
import ListLayout from '@/layouts/ListLayout.vue'
import Search from './components/Search/index.vue'
import { Button, notification, type TableProps } from 'ant-design-vue'
import { TabPane, getOperationCol, useFetchRuleDetail, useFetchTableHeader } from './providers'
import { exportResult, fetchCommissionDetail } from '@/api/commission'
import ImportFile from './components/ImportFile/index.vue'
import type { NotificationArgsProps } from 'ant-design-vue/es/notification'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { useTableData } from '@/hooks/useTableData'

type SearchComponentType = Required<InstanceType<typeof Search>>
type OnSearch = SearchComponentType['onSearch']
type SearchModel = Parameters<OnSearch>[0]

defineOptions({ name: 'SchemeDetail' })

const { hasPermission } = useGlobalStore()
const route = useRoute()
const { ruleId } = route.params

if (!ruleId || Array.isArray(ruleId)) {
  throw new TypeError('SchemeDetail: ruleId必须要有且不能为数组！')
}

const uiState = shallowReactive({
  ruleId: +ruleId,
  activeKeyRef: TabPane['计算结果'],
  searchModel: {} as SearchModel,
  openImportFile: false,
})

if (Number.isNaN(uiState.ruleId)) {
  throw new TypeError('SchemeDetail: ruleId格式不正确！')
}

const { data: ruleDetail, loading: detailLoading } = useFetchRuleDetail(uiState.ruleId)

const { runAsync: fetchTableData, loading, refresh, changePagination, dataSource, pagination } = useTableData(fetchCommissionDetail)

const tableCol = useFetchTableHeader(uiState.ruleId)

const columns = computed(() => {
  if (!Array.isArray(tableCol.value)) return []
  const columns: TableProps['columns'] = []
  const minWidth = 100
  tableCol.value.forEach((item) => {
    if (item.key !== 'id') {
      const width = item.name.length * 30
      columns.push({
        title: item.name,
        dataIndex: item.key,
        width: width < minWidth ? minWidth : width,
      })
    }
  })
  columns.push(...getOperationCol(uiState.ruleId, ruleDetail.value?.canBeNullify, refresh, hasPermission))
  return columns
})

const handleSearch: OnSearch = (searchModel) => {
  uiState.searchModel = searchModel
  fetchTableData({
    ruleId: uiState.ruleId,
    pageNum: pagination.value.current,
    pageSize: pagination.value.pageSize,
    ...searchModel,
  })
}
const handleTableChange: TableProps['onChange'] = ({ current = 1, pageSize = 10 }) => {
  changePagination(current, pageSize)
}

const handleExport = async () => {
  const res = await exportResult({ ruleId: uiState.ruleId, ...uiState.searchModel })
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
  <ASpin :spinning="detailLoading">
    <ListLayout>
      <template #search>
        <Search :title="ruleDetail?.name ?? ''" :ruleId="uiState.ruleId" @search="handleSearch" />
      </template>
      <ATabs type="card" :tabBarGutter="4">
        <template #rightExtra>
          <ASpace :size="8">
            <template v-if="ruleDetail?.canBeImport && hasPermission(SCHEME_PERMISSION_KEYS['方案明细导入'])">
              <ATooltip title="导入的数据必须严格遵守方案已有字段的格式，若需要新增字段或新增方案请前往产研系统提交业务需求" placement="bottom">
                <InfoCircleOutlined />
              </ATooltip>
              <AButton @click="uiState.openImportFile = true">导入结果</AButton>
              <ImportFile v-model:open="uiState.openImportFile" :ruleId="uiState.ruleId" :title="ruleDetail?.name" :refresh="refresh" />
            </template>
            <AButton v-if="hasPermission(SCHEME_PERMISSION_KEYS['方案明细导出'])" @click="handleExport">导出结果</AButton>
          </ASpace>
        </template>
        <ATabPane :key="TabPane['计算结果']" tab="计算结果">
          <CommonTable
            :columns="columns"
            :dataSource="dataSource"
            :scroll="{ x: 1000, y: 800 }"
            :loading="loading"
            :pagination="pagination"
            @change="handleTableChange"
          />
        </ATabPane>
        <!-- <ATabPane :key="TabPane['基础信息']" tab="基础信息">基础信息</ATabPane> -->
      </ATabs>
    </ListLayout>
  </ASpin>
</template>
