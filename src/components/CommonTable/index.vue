<script lang="ts" setup generic="RecordType = any">
import type Table from 'ant-design-vue/es/table/index'
import { type TableProps, tableProps } from 'ant-design-vue/es/table/index'
import OperationBtns, { shrinkOptBtnProps } from './OperationBtns'
import type { Slot } from 'vue'

type SlotType = InstanceType<typeof Table>['$slots'] & { headerLeft?: Slot<void>; headerRight?: Slot<void> }

const props = defineProps({
  ...tableProps(),
  /**
   * 是否折叠操作栏多余的按钮
   * 默认true
   * 如果传入的是数字x，则表示总共展示x个按钮，包括折叠的按钮
   */
  foldOptBtn: shrinkOptBtnProps(),
})
const slots = defineSlots<SlotType>()
defineOptions({ name: 'CommonTable' })

const localProps = shallowReactive<TableProps>({
  rowClassName: '',
  sticky: true,
})

const headerRef = ref<HTMLElement>()
watchEffect(() => {
  // console.log(`(╯°Д°)╯︵ ┻━┻丑陋的写法`)
  if (headerRef.value) {
    if (headerRef.value.children.length > 1) {
      headerRef.value.style.marginBottom = '16px'
    } else {
      headerRef.value.style.marginBottom = '0'
    }
  }
})

watchEffect(() => {
  if (props.sticky !== undefined) {
    localProps.sticky = props.sticky
  }
  if (!props.rowClassName) {
    localProps.rowClassName = (_, index) => ((index & 1) === 1 ? 'table-striped' : '')
  } else {
    localProps.rowClassName = props.rowClassName
  }
})
</script>

<template>
  <div v-if="slots.headerLeft || slots.headerRight" ref="headerRef" class="header-box">
    <slot name="headerLeft" />
    <div style="flex: 1"/>
    <slot name="headerRight" />
  </div>
  <ATable v-bind="props" :rowClassName="localProps.rowClassName" :sticky="localProps.sticky">
    <template #bodyCell="scope">
      <template v-if="scope.column.dataIndex === TABLE_COLUMN_OPERATION_KEY">
        <OperationBtns :record="scope.record" :column="scope.column" :foldOptBtn="props.foldOptBtn" />
      </template>
      <template v-else>
        <template v-if="scope.column.processor">
          {{ scope.column.processor(scope.record, scope.text) ?? TABLE_CELL_EMPTY }}
        </template>
        <slot name="bodyCell" v-bind="scope" />
      </template>
    </template>
  </ATable>
</template>

<style lang="less" scoped>
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
