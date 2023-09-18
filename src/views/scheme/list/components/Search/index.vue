<script lang="ts" setup>
import { type RangePicker } from 'ant-design-vue'
import { SEARCH_TYPE, SEARCH_TYPE_OPTIONS, STATUS_OPTIONS } from './constant'
import { dateRangeToTimestamp } from '@/utils/convert'

type SearchModel = Omit<RuleApi.FetchRuleListReq, 'pageNum' | 'pageSize'>

const emit = defineEmits<{
  search: [SearchModel]
}>()

defineOptions({ name: 'SchemeListSearch' })

function initForm() {
  return {
    searchType: SEARCH_TYPE['方案名称'],
    keywords: undefined,
    date: undefined as InstanceType<typeof RangePicker>['value'] | undefined,
    status: undefined,
    type: undefined,
    needCalc: undefined,
    cycle: undefined,
  }
}

function handleSearchModel(model: ReturnType<typeof initForm>): SearchModel {
  const { searchType, keywords, date, ...params } = model
  const searchMode = { ...params } as unknown as SearchModel
  if (searchType === SEARCH_TYPE['方案名称']) {
    searchMode.name = keywords
    searchMode.code = undefined
  }
  if (searchType === SEARCH_TYPE['规则编号']) {
    searchMode.code = keywords
    searchMode.name = undefined
  }
  if (Array.isArray(date) && date.length) {
    const [start, end] = dateRangeToTimestamp(date)
    searchMode.startDateStart = start
    searchMode.startDateEnd = end
  }
  return searchMode
}

const formModel = shallowReactive(initForm())

const onSubmit = () => {
  emit('search', handleSearchModel(formModel))
}
const onReset = () => {
  Object.assign(formModel, initForm())
  onSubmit()
}
</script>

<template>
  <AForm>
    <ARow :gutter="24">
      <ACol :span="6">
        <AFormItem>
          <AInput v-model:value="formModel.keywords" placeholder="请输入" allowClear>
            <template #addonBefore>
              <ASelect v-model:value="formModel.searchType" :options="SEARCH_TYPE_OPTIONS" />
            </template>
          </AInput>
        </AFormItem>
      </ACol>
      <ACol :span="6">
        <AFormItem label="计算周期">
          <ASelect v-model:value="formModel.cycle" placeholder="请选择" :options="CYCLE_OPTIONS" allowClear />
        </AFormItem>
      </ACol>
      <ACol :span="6">
        <AFormItem label="激励类型">
          <ASelect v-model:value="formModel.type" placeholder="请选择" :options="ENCOURAGE_TYPE_OPTIONS" allowClear />
        </AFormItem>
      </ACol>
      <ACol :span="6">
        <AFormItem label="是否计入应发激励">
          <ASelect v-model:value="formModel.needCalc" placeholder="请选择" :options="YES_OR_NO_OPTIONS" allowClear />
        </AFormItem>
      </ACol>
    </ARow>
    <ARow :gutter="24">
      <ACol :span="6">
        <AFormItem label="状态">
          <ASelect v-model:value="formModel.status" placeholder="请选择" :options="STATUS_OPTIONS" allowClear />
        </AFormItem>
      </ACol>
      <ACol :span="12">
        <AFormItem label="生效日期">
          <ARangePicker v-model:value="formModel.date" style="width: 100%" allowClear />
        </AFormItem>
      </ACol>
      <ACol :span="6" style="text-align: right">
        <AButton type="primary" @click="onSubmit">查询</AButton>
        <AButton style="margin: 0 8px" @click="onReset">重置</AButton>
      </ACol>
    </ARow>
  </AForm>
</template>

<style lang="less" scoped></style>
