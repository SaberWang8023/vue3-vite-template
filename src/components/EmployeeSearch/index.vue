<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { type SelectProps } from 'ant-design-vue'
import { useRequest } from 'vue-request'

interface IProps {
  value?: SelectProps['value']
  mode?: SelectProps['mode']
  /** 一个接受输入查询参数并返回promise的函数 */
  service: (val: string) => Promise<SelectPropsOptions>
}

const props = defineProps<IProps>()
const emit = defineEmits<{ 'update:value': [SelectProps['value']] }>()
defineOptions({ name: 'EmployeeSearch' })

const options = ref<SelectPropsOptions>([])
const value = useVModel(props, 'value', emit)

const { runAsync: fetchUser, loading } = useRequest(props.service, {
  debounceInterval: 500,
  onSuccess: (res) => {
    options.value = res
  },
})
const handleChange = (val: SelectProps['value']) => {
  if (val === undefined) {
    options.value = []
  }
  value.value = val
}

defineExpose({
  setOptions: (opts: SelectPropsOptions) => {
    options.value = opts
  },
})
</script>

<template>
  <ASelect
    v-model:value="value"
    :mode="props.mode"
    placeholder="请选择"
    style="width: 100%"
    :filterOption="false"
    :notFoundContent="loading ? undefined : null"
    :options="options"
    showSearch
    allowClear
    @search="fetchUser"
    @change="handleChange"
  >
    <template v-if="loading" #notFoundContent>
      <ASpin size="small" />
    </template>
  </ASelect>
</template>

<style lang="less" scoped></style>
