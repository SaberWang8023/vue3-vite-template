<template>
  <div>
    这是list
    <RouterLink :to="{ name: `${ROUTER_PREFIX}-detail` }">前往detail</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { ROUTER_PREFIX } from '../constant'
</script>

<style lang="less" scoped></style>
