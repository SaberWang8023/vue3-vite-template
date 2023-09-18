<script lang="ts" setup>
defineOptions({
  name: 'LayoutContent',
})
</script>

<template>
  <div class="container">
    <section class="search">
      <slot name="search"/>
    </section>
    <section class="content">
      <slot/>
    </section>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: @white;
  .search {
    padding: @spacing-row-base;
    overflow: hidden;
  }
  .content {
    padding: @spacing-row-base;
    overflow: hidden;
  }
}
</style>
