import type { PaginationProps, TableProps } from 'ant-design-vue'
import { usePagination, type PaginationOptions, type Service } from 'vue-request'

type RequiredKeys = 'total' | 'current' | 'pageSize' | 'showQuickJumper' | 'showTotal'

type PaginationPropsType = OptionalRequired<PaginationProps, RequiredKeys>

export const defaultPagination: PaginationPropsType = {
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `共${total}条`,
} as const

// 用于处理表格接口返回的数据
export const useTableData = <R extends ApiBase.ResponseList, P extends unknown[] = any>(
  service: Service<R, P>,
  options?: PaginationOptions<R, P>
) => {
  const paginationRequest = usePagination(service, {
    pagination: {
      currentKey: 'pageNum',
      pageSizeKey: 'pageSize',
    },
    ...options,
  })

  const tableDataRes = paginationRequest.data

  const dataSource = computed<Required<TableProps>['dataSource']>(() => tableDataRes.value?.resultList ?? [])

  const pagination = computed<PaginationPropsType>(() => {
    if (!tableDataRes.value) return defaultPagination
    const { currentPage, itemsPerPage, totalItems } = tableDataRes.value
    return {
      ...defaultPagination,
      total: totalItems,
      current: currentPage === 0 ? 1 : currentPage,
      pageSize: itemsPerPage,
    }
  })

  return { ...paginationRequest, dataSource, pagination }
}
