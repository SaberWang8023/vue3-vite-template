<script lang="ts" setup>
import ListLayout from '@/layouts/ListLayout.vue'
import Search from './components/Search/index.vue'
import { useColumns } from './constant'
import { fetchRuleList } from '@/api/rule'
import { useTableData } from '@/hooks/useTableData'

type SearchComponentType = Required<InstanceType<typeof Search>>
type OnSearch = SearchComponentType['onSearch']
type SearchModel = Parameters<OnSearch>[0]

const uiState = shallowReactive({
  searchModel: {} satisfies SearchModel,
})

const columns = useColumns()

const { runAsync: fetchList, loading, changePagination, dataSource, pagination } = useTableData(fetchRuleList)

const handleSearch: OnSearch = (searchModel) => {
  uiState.searchModel = searchModel

  fetchList({ ...searchModel, pageNum: pagination.value.current, pageSize: pagination.value.pageSize })
}

const handleTableChange = ({ current = 1, pageSize = 10 }) => {
  changePagination(current, pageSize)
}

onMounted(async () => {
  await fetchList({ ...uiState.searchModel, pageNum: pagination.value.current, pageSize: pagination.value.pageSize })
})
</script>

<template>
  <ListLayout>
    <template #search>
      <Search @search="handleSearch" />
    </template>
    <CommonTable
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
      :scroll="{ x: 1000, y: 800 }"
      :pagination="pagination"
      @change="handleTableChange"
    />
  </ListLayout>
</template>

<style lang="less" scoped></style>
