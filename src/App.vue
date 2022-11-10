<template>
  <AConfigProvider v-bind="configProviderProps">
    <RouterView />
  </AConfigProvider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('cn')

const getPopupContainer = (triggerNode?: HTMLElement): HTMLElement => {
  if (triggerNode?.parentNode) {
    return triggerNode.parentNode as HTMLElement
  }
  return document.body
}

const configProviderProps = readonly({ locale: zhCN, getPopupContainer })
</script>

<style lang="less">
@import './styles/normalize.less';
@import './styles/customize.less';
</style>
