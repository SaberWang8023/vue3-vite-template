<template>
  <a-layout-sider v-model:collapsed="store.collapsed">
    <div class="sidebar-logo">
      <span>
        <img src="../assets/logo.png" alt="" />
        <h1 v-if="!store.collapsed">Vue3 Template</h1>
      </span>
    </div>
    <a-menu
      v-model:selectedKeys="baseState.selectedKeys"
      v-model:openKeys="baseState.openKeys"
      :inlineCollapsed="collapsed"
      mode="inline"
      theme="dark"
    >
      <template v-for="nav in NavRoutes" :key="nav.path">
        <a-menu-item>
          <template v-if="nav.meta?.icon" #icon>
            <component :is="nav.meta?.icon" />
          </template>
          <router-link :to="{ name: nav.name, path: nav.path }">
            {{ nav.meta?.title }}
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { NavRoutes } from '@/routers/router-table'
import { MenuProps } from 'ant-design-vue'
import { ref } from 'vue'
import { layoutStore } from './store'

const store = layoutStore()
const baseState = reactive<Pick<MenuProps, 'selectedKeys' | 'openKeys'>>({
  selectedKeys: [],
  openKeys: [],
})

const collapsed = ref(false)
const router = useRouter()

watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat()
    baseState.selectedKeys = matched.filter((r) => r.name !== 'index').map((r) => r.path)
    baseState.openKeys = matched.filter((r) => r.path !== router.currentRoute.value.path).map((r) => r.path)
  }
})
</script>

<style lang="less" scoped>
.sidebar-logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 16px;
  cursor: pointer;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }

  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }

  h1 {
    display: inline-block;
    height: 32px;
    margin: 0 0 0 12px;
    color: white;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    vertical-align: middle;
    animation: title-hide 0.3s;
    // opacity: 1;
    // transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}

@keyframes title-hide {
  0% {
    display: none;
    opacity: 0;
  }
  50% {
    display: none;
    opacity: 0;
  }
  100% {
    display: unset;
    opacity: 1;
  }
}
</style>
