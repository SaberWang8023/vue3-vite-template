<template>
  <ALayout class="layout">
    <ALayoutSider>
      <LayoutSideBar />
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader>
        <LayoutHeader />
      </ALayoutHeader>
      <ALayoutContent>Content</ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LayoutSideBar from './LayoutSideBar.vue'
import LayoutHeader from './LayoutHeader.vue'
import { layoutStore } from './store'

const store = layoutStore()
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}
</style>
