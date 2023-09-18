<script lang="ts" setup>
defineOptions({
  name: 'LayoutContent',
})
</script>

<template>
  <div class="main-wrapper">
    <div class="scroll-wrap">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-wrapper {
  height: 100%;
  min-height: calc(100vh - 60px);
  width: 100%;
  border: 20px solid transparent;
  border-left: none;
  border-right: none;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  .scroll-wrap {
    width: 100%;
    padding: 0 20px;
    position: absolute;
  }
}
</style>
