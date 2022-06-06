<template>
  <a-layout>
    <a-layout-sider>
      <LayoutSideBar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <LayoutHeader />
      </a-layout-header>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LayoutSideBar from './LayoutSideBar.vue'
import LayoutHeader from './LayoutHeader.vue'
import { layoutStore } from './store'

const store = layoutStore()
</script>

<style lang="less" scoped></style>
