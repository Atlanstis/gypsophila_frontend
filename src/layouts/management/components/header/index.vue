<script lang="ts" setup>
import { useManagementLayoutStore } from '@/store';

const layoutStore = useManagementLayoutStore();

defineOptions({
  name: 'ManagementLayoutHeader',
});
</script>

<template>
  <div :class="['layout-header', 'flex h-full items-center bg-white']">
    <div class="h-full flex-1 overflow-hidden">
      <div @click="layoutStore.toggleSiderCollapsed">切换</div>
    </div>
    <div class="flex h-full">用户Icon</div>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
