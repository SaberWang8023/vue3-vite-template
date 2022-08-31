<template>
  <ALayoutHeader class="header-container">
    <div>
      <a-button type="link" style="margin-bottom: 16px; color: #ffffff" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="store.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
    </div>
  </ALayoutHeader>
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { layoutStore } from './store'

const store = layoutStore()

const toggleCollapsed = () => {
  store.collapsed = !store.collapsed
}
</script>

<style lang="less" scoped>
@import '@/styles/var.less';
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  height: 60px;
}
</style>
