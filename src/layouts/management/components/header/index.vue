<script lang="ts" setup>
import { useManagementLayoutStore } from '@/store';

import { ThemeToggle } from './components';

const layoutStore = useManagementLayoutStore();

defineOptions({
  name: 'ManagementLayoutHeader',
});
</script>

<template>
  <div :class="['layout-header', 'flex h-full items-center']">
    <div class="h-full flex-1 overflow-hidden">
      <div @click="layoutStore.toggleSiderCollapsed">切换</div>
    </div>
    <div class="flex h-full items-center gap-2 pr-4">
      <ThemeToggle />
      <div>用户Icon</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
