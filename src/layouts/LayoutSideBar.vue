<template>
  <a-menu v-model:selectedKeys="selectedKeys" :inlineCollapsed="collapsed" mode="inline" theme="light" @click="handleClick">
    <template v-for="nav in NavRoutes" :key="nav.name">
      <a-menu-item>
        <template v-if="nav.meta?.icon" #icon>
          <components :is="nav.meta?.icon" />
        </template>
        {{ nav.meta?.title }}
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import { NavRoutes } from '@/routers/router-table'
import type { MenuProps } from 'ant-design-vue'
import { ref } from 'vue'

const selectedKeys = ref<string[]>([])
const collapsed = ref(false)

const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e)
}
</script>

<style lang="less" scoped></style>
