<template>
  <div class="header-container">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="store.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { layoutStore } from './store'

const store = layoutStore()

const toggleCollapsed = () => {
  store.collapsed = !store.collapsed
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
