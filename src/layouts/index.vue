<template>
  <a-layout class="layout">
    <layout-side-bar />
    <a-layout>
      <layout-header />
      <a-layout-content>
        <water-mark content="宗纯">
          <router-view />
        </water-mark>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import WaterMark from '@/components/WaterMark'
import LayoutHeader from './LayoutHeader.vue'
import LayoutSideBar from './LayoutSideBar.vue'
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}
</style>
