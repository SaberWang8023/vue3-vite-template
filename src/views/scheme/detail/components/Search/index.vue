<script lang="ts" setup>
import { LeftOutlined } from '@ant-design/icons-vue'
import { getRouteName } from '@/routers/attach-router-names'
import { fetchAccount, fetchDepartment, fetchRuleCycle } from '@/api/rule'
import { type SelectProps, type CascaderProps } from 'ant-design-vue'
import { useRequest } from 'vue-request'
import Cascader, { type ShowSearchType } from 'ant-design-vue/es/cascader'
import EmployeeSearch from '@/components/EmployeeSearch/index.vue'

interface IProp {
  title: string
  ruleId: number
}
type SearchModel = Omit<CommissionApi.FetchDetailReq, 'pageNum' | 'pageSize' | 'ruleId'>

const props = defineProps<IProp>()
const emit = defineEmits<{
  search: [SearchModel]
}>()

defineOptions({ name: 'SchemeDetailSearch' })

const route = useRoute()
const { cycle, account } = route.query

const employeeSearchRef = ref<InstanceType<typeof EmployeeSearch>>()

const uiState = shallowReactive({
  cycleOptions: [] as SelectPropsOptions,
  departmentOptions: [] as CascaderProps['options'],
})

const formModel = shallowReactive({
  account: undefined as string | undefined,
  cycle: '',
  departments: undefined as CascaderProps['value'],
})

const { runAsync: fetchCycle } = useRequest(fetchRuleCycle, {
  onSuccess: (res) => {
    uiState.cycleOptions = res.map((item) => ({
      label: item,
      value: item,
    }))
    if (cycle && !Array.isArray(cycle) && res.includes(cycle)) {
      formModel.cycle = cycle
    } else {
      formModel.cycle = res[0]
    }
  },
})

const onSubmit = () => {
  let departments
  if (formModel.departments) {
    departments = formModel.departments.map((item) => {
      if (Array.isArray(item)) {
        return item.join('-')
      }
      return `${item}`
    })
  }
  emit('search', { ...formModel, departments })
}

const onReset = () => {
  Object.assign(formModel, { cycle: uiState.cycleOptions[0].value, account: '', departments: [] })
  onSubmit()
}

const fetchUser = async (val: string) => {
  if (!val || !formModel.cycle) return []
  const response = await fetchAccount(props.ruleId, formModel.cycle, val)
  return response.map((item) => ({ label: `${item.alias}-${item.name}`, value: item.account }))
}

const { runAsync: fetchDep } = useRequest(fetchDepartment, {
  onSuccess: (res) => {
    uiState.departmentOptions = res
  },
})

const handleCycleChange: SelectProps['onChange'] = async (val) => {
  if (typeof val === 'string') {
    formModel.cycle = val
    // 切换周期时，清空员工并清空员工列表
    formModel.account = undefined
    employeeSearchRef.value?.setOptions([])
    // 切换周期时，清空部门并重新请求部门数据
    formModel.departments = []
    await fetchDep(props.ruleId, formModel.cycle)
  }
}

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()))
}

onMounted(async () => {
  await fetchCycle(props.ruleId)
  if (account && !Array.isArray(account)) {
    const res = await fetchUser(account)
    employeeSearchRef.value?.setOptions(res)
    formModel.account = account
  }
  await fetchDep(props.ruleId, formModel.cycle)
  onSubmit()
})
</script>

<template>
  <div class="search">
    <div class="search-nav">
      <RouterLink :to="{ name: getRouteName(ROUTER_PREFIX.SCHEME, 'list') }">
        <template #default="{ navigate }">
          <AButton size="large" type="text" @click="navigate">
            <template #icon>
              <LeftOutlined />
            </template>
            {{ props.title }}
          </AButton>
        </template>
      </RouterLink>
    </div>
    <AForm class="search-form" :model="formModel" @finish="onSubmit">
      <ARow :gutter="24">
        <ACol :span="6">
          <AFormItem label="计算时间" name="cycle">
            <ASelect v-model:value="formModel.cycle" :options="uiState.cycleOptions" @change="handleCycleChange" />
          </AFormItem>
        </ACol>
        <ACol :span="6">
          <AFormItem label="员工" name="account">
            <EmployeeSearch ref="employeeSearchRef" v-model:value="formModel.account" :service="fetchUser" />
          </AFormItem>
        </ACol>
        <ACol :span="6">
          <AFormItem label="部门" name="departments">
            <ACascader
              v-model:value="formModel.departments"
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
          <div style="float: right">
            <AButton type="primary" htmlType="submit">查询</AButton>
            <AButton style="margin: 0 8px" @click="onReset">重置</AButton>
          </div>
        </ACol>
      </ARow>
    </AForm>
  </div>
</template>

<style lang="less" scoped>
.search {
  @nav-max-width: 300px;

  display: flex;
  align-items: baseline;
  &-nav {
    width: @nav-max-width;
    margin-right: @spacing-col-sm;
  }
  &-form {
    width: calc(100% - @nav-max-width);
  }
}
</style>
