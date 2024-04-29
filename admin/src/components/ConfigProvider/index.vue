<template>
  <a-config-provider :locale="zhCN" :theme="theme">
    <slot />
  </a-config-provider>
</template>

<script setup name="onfigProvider">
  import zhCN from "ant-design-vue/lib/locale/zh_CN";
  import useSetting from '@/stores/modules/settings';
  import { configProviderProps } from 'ant-design-vue/es/config-provider/context';
  import { merge } from 'lodash-es';

  const props = defineProps(configProviderProps());
  const { themeConfig, toggleTheme, layoutSetting } = useSetting();
  toggleTheme(layoutSetting.navTheme);
  const theme = computed(() => {
    return merge({}, layoutSetting.themeConfig, props.theme);
  });
</script>