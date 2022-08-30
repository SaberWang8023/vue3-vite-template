<template>
  <div>
    这一页可有可无，主要看是不是需要一个模块级别的公共布局样式。如果要，那就替换router.ts里面的component
    <CommonRouter keep-alive />
  </div>
</template>

<script lang="ts" setup>
import CommonRouter from '@/components/CommonRouter/index.vue'
</script>

<style lang="less" scoped></style>
