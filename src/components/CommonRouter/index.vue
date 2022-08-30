<template>
  <template v-if="props.keepAlive">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>

<script setup lang="ts">
const props = defineProps({ keepAlive: { type: Boolean, default: false } })
</script>
