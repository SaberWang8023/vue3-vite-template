<template>
  <a-layout-header class="header-container">
    <div class="left-container">
      <a-button type="link" style="color: #ffffff" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="store.collapsed" style="color: #333" />
        <MenuFoldOutlined v-else style="color: #333" />
      </a-button>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="item of breadcrumb" :key="item.path">
          <router-link :to="{ path: item.path }">
            {{ item.breadcrumbName }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { layoutStore } from './store'
const router = useRouter()
const store = layoutStore()

const toggleCollapsed = () => {
  store.collapsed = !store.collapsed
}

const breadcrumb = computed(() =>
  router.currentRoute.value.matched.concat().map((item) => {
    return {
      path: item.path,
      icon: item.meta.icon,
      params: item.meta?.params,
      breadcrumbName: item.meta.title || '',
    }
  })
)
</script>

<style lang="less" scoped>
@import '@/styles/var.less';
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  height: 60px;
  background-color: #ffffff;
  .left-container {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
