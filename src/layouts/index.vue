<script lang="ts" setup>
import LayoutContent from './LayoutContent.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutSideBar from './LayoutSideBar.vue'

defineOptions({ name: 'LayoutContent' })
</script>

<template>
  <ALayout class="layout">
    <LayoutSideBar />
    <ALayout>
      <LayoutHeader />
      <ALayoutContent>
        <LayoutContent />
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}
</style>
