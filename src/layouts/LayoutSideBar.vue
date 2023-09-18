<script lang="ts" setup>
import { moduleRouters } from '@/routers/constant'
import { type MenuProps } from 'ant-design-vue'
import { ref } from 'vue'
import { useLayoutStore } from './store'

defineOptions({ name: 'LayoutSideBar' })

const store = useLayoutStore()
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

<template>
  <a-layout-sider v-model:collapsed="store.collapsed">
    <div class="sidebar-logo">
      <span>
        <img
          class="logo"
          :class="store.collapsed && 'logo-collapsed'"
          src="https://officetest-efficiency.tsign.cn/fe-efficiency/favicon.png"
          alt=""
        />
        <h1 class="title" :class="store.collapsed && 'title-hide'">激励系统</h1>
      </span>
    </div>
    <a-menu
      v-model:selectedKeys="baseState.selectedKeys"
      v-model:openKeys="baseState.openKeys"
      :inlineCollapsed="collapsed"
      mode="inline"
      theme="dark"
    >
      <template v-for="nav in moduleRouters" :key="nav.path">
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

<style lang="less" scoped>
.sidebar-logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 16px;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }

  .logo {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
    transition:
      height 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
      margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      color 0.3s;
  }
  .logo-collapsed {
    height: 38px;
    margin-left: 4px;
  }

  .title {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    height: 32px;
    margin: 0 0 0 12px;
    color: white;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    vertical-align: middle;
    animation: title-hide 0.3s;
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .title-hide {
    opacity: 0;
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
