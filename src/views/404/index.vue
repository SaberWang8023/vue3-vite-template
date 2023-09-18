<script lang="ts" setup>
import { type ResultProps } from 'ant-design-vue'

defineOptions({ name: '404' })
const resultProps = shallowReactive<ResultProps>({
  status: '404',
  title: '404',
  subTitle: '啊哦，页面好像找不到了😭~',
})

const { path } = useRoute()
if (path.includes('403')) {
  resultProps.status = '403'
  resultProps.title = '暂无权限'
  resultProps.subTitle = undefined
}
</script>

<template>
  <CommonResult v-bind="resultProps" />
</template>
