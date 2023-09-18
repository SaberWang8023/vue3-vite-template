<script lang="ts" setup>
import { getRouteName } from '@/routers/attach-router-names'
import type { TabsProps } from 'ant-design-vue'

interface IProps {
  tabs: {
    name: string
    key: string
  }[]
  activeKey?: string
}

const props = defineProps<IProps>()

defineOptions({
  name: 'TabsRouter',
})

const router = useRouter()

const activeKeyRef = ref(props.activeKey)

const handleTabChange: TabsProps['onChange'] = (activeKey) => {
  if (typeof activeKey === 'string') {
    activeKeyRef.value = activeKey
    router.replace({ name: getRouteName(activeKey) })
  }
}
watch(
  () => router.currentRoute.value.fullPath,
  (value) => {
    activeKeyRef.value = value.substring(1).replaceAll('/', '-')
  },
  { immediate: true }
)
</script>

<template>
  <ATabs class="tab-wrapper" type="card" :tabBarGutter="4" :activeKey="activeKeyRef" @change="handleTabChange">
    <ATabPane v-for="tab in props.tabs" :key="tab.key" :tab="tab.name"/>
  </ATabs>
  <RouterView>
    <template #default="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </template>
  </RouterView>
</template>

<style lang="less" scoped>
.tab-wrapper {
  :deep(.ant-tabs-nav) {
    margin: 0;
  }
}
</style>
