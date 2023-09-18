<script lang="ts" setup>
import TabsRouter from '@/components/TabsRouter/index.vue'
import { TabMap } from './providers'

defineOptions({
  name: 'ResultList',
  // FIXME: 临时解决方案，后续需要优化 --宗纯
  beforeRouteEnter(to, from, next) {
    const globalStore = useGlobalStore()
    if (to.fullPath !== '/result/list') {
      if (globalStore.hasPermission([RESULT_PERMISSION_KEYS.查看应结算列表, RESULT_PERMISSION_KEYS.查看无需结算列表])) {
        next()
      } else {
        next({ path: '/403', replace: true })
      }
    } else {
      if (globalStore.hasPermission([RESULT_PERMISSION_KEYS.查看应结算列表])) {
        next({ path: '/result/list/need', replace: true })
      } else if (globalStore.hasPermission([RESULT_PERMISSION_KEYS.查看无需结算列表])) {
        next({ path: '/result/list/needless', replace: true })
      } else {
        next({ path: '/403', replace: true })
      }
    }
  },
  beforeRouteUpdate(to) {
    if (to.fullPath === '/result/list') {
      return false
    }
  },
})
const { hasPermission } = useGlobalStore()

const routerTabs = ref<InstanceType<typeof TabsRouter>['$props']['tabs']>([])

if (hasPermission(RESULT_PERMISSION_KEYS.查看应结算列表)) {
  routerTabs.value.push({ name: '应结算', key: TabMap['应结算'] })
}
if (hasPermission(RESULT_PERMISSION_KEYS.查看无需结算列表)) {
  routerTabs.value.push({ name: '无需结算', key: TabMap['无需结算'] })
}
</script>

<template>
  <div>
    <TabsRouter :tabs="routerTabs" />
  </div>
</template>
