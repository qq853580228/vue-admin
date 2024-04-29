<template>
  <config-provider>
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
    <LockScreen />
  </config-provider>
</template>

<script setup lang="ts">
  import ConfigProvider from '@/components/ConfigProvider/index.vue';
  import LockScreen from '@/components/LockScreen/index.vue';
</script>
