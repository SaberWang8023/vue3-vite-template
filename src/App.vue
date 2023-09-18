<script setup lang="ts">
import { type ConfigProviderProps } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('cn')

const configProviderProps: ConfigProviderProps = { locale: zhCN, transformCellText: ({ text }) => text ?? TABLE_CELL_EMPTY }
</script>

<template>
  <AConfigProvider v-bind="configProviderProps">
    <RouterView />
  </AConfigProvider>
</template>
