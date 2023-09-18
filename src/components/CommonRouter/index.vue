<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { type VNode } from 'vue'
import { type RouteLocationNormalizedLoaded } from 'vue-router'

interface IProps {
  keepAlive?: boolean
  transition?: boolean
}

const props = withDefaults(defineProps<IProps>(), { keepAlive: false, transition: true })
defineOptions({
  name: 'CommonRouter',
})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ Component: VNode; route: RouteLocationNormalizedLoaded }>()
</script>

<template>
  <DefineTemplate v-slot="{ Component, route }">
    <KeepAlive v-if="props.keepAlive">
      <component :is="Component" :key="route.fullPath" />
    </KeepAlive>
    <component :is="Component" v-else :key="route.fullPath" />
  </DefineTemplate>
  <RouterView>
    <template #default="{ Component, route }">
      <template v-if="props.transition">
        <Transition name="fade-slide" mode="out-in" appear>
          <ReuseTemplate :Component="Component" :route="route" />
        </Transition>
      </template>
      <template v-else>
        <ReuseTemplate :Component="Component" :route="route" />
      </template>
    </template>
  </RouterView>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
