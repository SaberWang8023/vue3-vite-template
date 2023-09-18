<script lang="ts" setup>
import type { CascaderProps, SelectProps } from 'ant-design-vue'
import Cascader, { type ShowSearchType } from 'ant-design-vue/es/cascader'
import { ResultStatus } from '../../providers'
import { enumToOptions } from '@/utils/convert'
import { fetchResultAccount, fetchResultAvailableCycle, fetchResultDepartment } from '@/api/result'
import { useRequest } from 'vue-request'
import EmployeeSearch from '@/components/EmployeeSearch/index.vue'

type SearchModel = Omit<ResultApi.FetchResultDetailReq, 'pageNum' | 'pageSize' | 'needCalc'> & {
  /** 计算周期 */
  calcCycle: number
}
type FormModel = SearchModel & { confirmed: number | undefined }

const emit = defineEmits<{
  search: [SearchModel]
}>()
defineOptions({ name: 'ResultListSearch' })

function initFromModel() {
  return {
    commissionType: ENCOURAGE_TYPE.现金,
    calcCycle: CYCLE['自然月'],
    cycle: undefined,
    account: undefined,
    department: undefined,
    confirmed: undefined,
  } as FormModel
}

const employeeSearchRef = ref<InstanceType<typeof EmployeeSearch>>()

const ENCOURAGE_STATUS = enumToOptions(ResultStatus)

const formModel = shallowReactive(initFromModel())

const uiState = shallowReactive({
  cycleOptions: [] as CascaderProps['options'],
  departmentOptions: [] as CascaderProps['options'],
})

// #region 给员工和部门组件的 service 定义
const fetchEmployee = async (val: string) => {
  if (!val || !formModel.cycle) return []
  const response = await fetchResultAccount(formModel.cycle, val)
  return response.map((item) => ({ label: `${item.alias}-${item.name}`, value: item.account }))
}

const { runAsync: fetchDep } = useRequest(fetchResultDepartment, {
  onSuccess: (res) => {
    uiState.departmentOptions = res // ?? []
  },
})
// #endregion

// 获取计算时间相关请求
const fetchCycle = async () => {
  const response = await fetchResultAvailableCycle(formModel.calcCycle)
  if (response.length > 0) {
    uiState.cycleOptions = response.map((item) => ({
      label: item,
      value: item,
    }))
    formModel.cycle = response[0]
  } else {
    uiState.cycleOptions = []
    formModel.cycle = undefined
  }
}

// 激励类型改变
const handleTypeChange: SelectProps['onChange'] = (val) => {
  if (typeof val !== 'number') return
  Object.assign(formModel, initFromModel(), { commissionType: val })
  fetchCycle()
}

// 计算周期改变
const handleCalcCycleChange: SelectProps['onChange'] = (val) => {
  if (typeof val !== 'number') return
  formModel.calcCycle = val
  formModel.cycle = undefined
  formModel.account = undefined
  formModel.department = []
  fetchCycle()
}

// 计算时间改变
const handleCycleChange: SelectProps['onChange'] = (val) => {
  if (typeof val !== 'string') return
  formModel.cycle = val
  formModel.account = undefined
  formModel.department = []
}

const handleSubmit = () => {
  let department, confirmed
  if (formModel.department) {
    department = formModel.department.map((item) => {
      if (Array.isArray(item)) {
        return item.join('-')
      }
      return `${item}`
    })
  }
  if (formModel.confirmed !== undefined) {
    confirmed = formModel.confirmed === ResultStatus['已确认']
  }
  emit('search', {
    ...formModel,
    department,
    confirmed,
  })
}

const handleReset = async () => {
  Object.assign(formModel, initFromModel())
  await fetchCycle()
  handleSubmit()
}

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()))
}

watch(
  () => formModel.cycle,
  (val) => {
    if (val === undefined) {
      return
    }
    fetchDep(val)
  }
)

watch(
  () => formModel.account,
  (val) => {
    if (val === undefined) {
      employeeSearchRef.value?.setOptions([])
    }
  }
)

onMounted(async () => {
  await fetchCycle()
  handleSubmit()
})
</script>

<template>
  <div>
    <AForm :model="formModel" :labelCol="{ span: 6 }" @finish="handleSubmit">
      <ARow :gutter="24">
        <ACol :span="6">
          <AFormItem label="激励类型" name="commissionType">
            <ASelect :value="formModel.commissionType" placeholder="请选择" :options="ENCOURAGE_TYPE_OPTIONS" @change="handleTypeChange" />
          </AFormItem>
        </ACol>
        <ACol :span="6">
          <AFormItem label="计算周期" name="calcCycle">
            <ASelect :value="formModel.calcCycle" placeholder="请选择" :options="CYCLE_OPTIONS" @change="handleCalcCycleChange" />
          </AFormItem>
        </ACol>
        <ACol :span="6">
          <AFormItem label="计算时间" name="cycle">
            <ASelect :value="formModel.cycle" placeholder="请选择" :options="uiState.cycleOptions" @change="handleCycleChange" />
          </AFormItem>
        </ACol>
        <ACol :span="6">
          <AFormItem label="员工" name="account">
            <EmployeeSearch ref="employeeSearchRef" v-model:value="formModel.account" :service="fetchEmployee" />
          </AFormItem>
        </ACol>
      </ARow>
      <ARow :gutter="24">
        <ACol :span="6">
          <AFormItem label="部门" name="department">
            <ACascader
              v-model:value="formModel.department"
              :options="uiState.departmentOptions"
              :showSearch="{ filter }"
              :fieldNames="{ label: 'name', value: 'name', children: 'childNodes' }"
              :showCheckedStrategy="Cascader.SHOW_CHILD"
              placeholder="请选择"
              multiple
              allowClear
            />
          </AFormItem>
        </ACol>
        <ACol :span="6">
          <AFormItem label="激励状态" name="confirmed">
            <ASelect v-model:value="formModel.confirmed" placeholder="请选择" :options="ENCOURAGE_STATUS" allowClear />
          </AFormItem>
        </ACol>
        <ACol :offset="6" :span="6">
          <ASpace style="float: right" :size="8">
            <AButton type="primary" htmlType="submit">查询</AButton>
            <AButton type="default" @click="handleReset">重置</AButton>
          </ASpace>
        </ACol>
      </ARow>
    </AForm>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
}
.form {
  margin-bottom: @spacing-row-base;
  &-item {
    width: 18%;
    &-date-picker {
      width: 100%;
    }
  }
}
</style>
