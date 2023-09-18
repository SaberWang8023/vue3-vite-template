<script lang="ts" setup>
import type { FormInstance, SelectProps } from 'ant-design-vue'
// TODO:  value --宗纯
const INPUT_SEARCH_TYPES: SelectProps['options'] = [
  { label: '系数名称', value: 'name' },
  { label: '系数编号', value: 'number' },
]
// TODO:  value --宗纯
const FACTOR_TYPES = [
  { label: '常数', value: 'constant' },
  { label: '阶梯系数', value: 'stepFactor' },
  { label: '分类系数', value: 'classifyFactor' },
]

const columns = [
  { title: '系数名称', dataIndex: 'factorName' },
  { title: '系数编号', dataIndex: 'factorNo' },
  { title: '系数类型', dataIndex: 'factorType' },
  { title: '更新时间', dataIndex: 'updateTime' },
  { title: '操作', key: 'operation' },
]

const formRef = ref<FormInstance | null>(null)

const filterState = reactive({ inputSearchType: INPUT_SEARCH_TYPES[0].value, inputSearch: undefined, factorType: undefined })

const onFinish = (values: typeof filterState) => {
  console.log('Received values of form: ', values)
  // console.log('formState: ', filterState)
  // TODO: 接口请求 --宗纯
}
const resetFields = () => {
  formRef.value?.resetFields()
  // TODO: 接口请求 --宗纯
}
</script>

<template>
  <div>
    <div class="filter-wrapper">
      <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="filterState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="inputSearchType">
              <a-input-group compact>
                <a-select v-model="filterState.inputSearchType" style="width: 120px" :options="INPUT_SEARCH_TYPES" />
                <a-form-item name="inputSearch" style="margin-bottom: unset">
                  <a-input v-model="filterState.inputSearch" style="width: 50%" />
                </a-form-item>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="系数类型" name="price">
              <a-select v-model="filterState.inputSearchType" :options="FACTOR_TYPES" />
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right">
            <a-button type="primary" htmlType="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="resetFields">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-wrapper">
      <CommonTable :columns="columns" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.filter-wrapper {
  height: 50px;
  width: auto;
  background-color: #ffffff;
}
.table-wrapper {
  height: 100%;
  background-color: #ffffff;
}
</style>
