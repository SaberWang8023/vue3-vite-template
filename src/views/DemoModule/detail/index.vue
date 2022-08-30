<template>
  <div>
    这是detail
    <RouterLink :to="{ name: `${ROUTER_PREFIX}-list` }">返回列表</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { ROUTER_PREFIX } from '../constant'
</script>

<style lang="less" scoped></style>
