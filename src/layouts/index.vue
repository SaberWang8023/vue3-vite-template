<template>
  <a-layout class="layout">
    <layout-side-bar />
    <a-layout>
      <layout-header />
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import LayoutHeader from './LayoutHeader.vue'
import LayoutSideBar from './LayoutSideBar.vue'
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}
</style>
