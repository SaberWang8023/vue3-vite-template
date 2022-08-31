<template>
  <ALayout class="layout">
    <ALayoutSider v-model:collapsed="store.collapsed">
      <LayoutSideBar />
    </ALayoutSider>
    <ALayout>
      <LayoutHeader />
      <ALayoutContent>
        <RouterView />
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script lang="ts" setup>
import LayoutHeader from './LayoutHeader.vue'
import LayoutSideBar from './LayoutSideBar.vue'
import { layoutStore } from './store'

const store = layoutStore()
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}
</style>
