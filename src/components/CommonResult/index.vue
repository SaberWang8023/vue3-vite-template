<script lang="ts" setup>
import { type ResultProps } from 'ant-design-vue'

const props = defineProps<ResultProps>()
defineOptions({ name: 'CommonResult' })
</script>

<template>
  <AResult v-bind="props">
    <template #subTitle>
      <template v-if="$slots.subTitle">
        <slot name="subTitle" />
      </template>
      <template v-else>
        <span>
          对不起，您暂无此权限，请联系系统管理员
          <AButton type="link" href="dingtalk://dingtalkclient/action/sendmsg?spm=dingtalk_id=w18773608322" style="padding: 0">@鸳尾-王锶锶</AButton>
        </span>
      </template>
    </template>
  </AResult>
</template>
