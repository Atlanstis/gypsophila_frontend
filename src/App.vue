<script setup lang="ts">
import { useColorMode } from '@vueuse/core';

// 初始化颜色模式
useColorMode({
  attribute: 'class',
  modes: {
    light: 'light',
    dark: 'dark',
  },
});
</script>

<template>
  <router-view></router-view>
</template>
