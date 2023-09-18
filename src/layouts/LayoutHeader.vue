<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useLayoutStore } from './store'

defineOptions({
  name: 'LayoutHeader',
})

const router = useRouter()
const store = useLayoutStore()

const toggleCollapsed = () => {
  store.collapsed = !store.collapsed
}

const breadcrumb = computed(() => {
  const breadcrumbArr: any[] = []
  router.currentRoute.value.matched.concat().forEach((item) => {
    if (item.path === '/') return
    breadcrumbArr.push({
      path: item.path,
      icon: item.meta.icon,
      params: item.meta?.params,
      breadcrumbName: item.meta.title || '',
    })
  })
  return breadcrumbArr
})
</script>

<template>
  <ALayoutHeader class="header-container">
    <div class="left-container">
      <AButton type="link" style="color: #ffffff" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="store.collapsed" style="color: #333" />
        <MenuFoldOutlined v-else style="color: #333" />
      </AButton>
      <ABreadcrumb>
        <ABreadcrumbSeparator>/</ABreadcrumbSeparator>
        <template v-for="item of breadcrumb" :key="item.path">
          <ABreadcrumbItem>
            <routerLink :to="{ path: item.path }">
              {{ item.breadcrumbName }}
            </routerLink>
          </ABreadcrumbItem>
        </template>
      </ABreadcrumb>
    </div>
  </ALayoutHeader>
</template>

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
