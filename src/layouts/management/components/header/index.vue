<script lang="ts" setup>
import { useManagementLayoutStore } from '@/store';

const layoutStore = useManagementLayoutStore();

defineOptions({
  name: 'ManagementLayoutHeader',
});
</script>

<template>
  <div :class="['layout-header', 'h-full flex-y-center bg-white']">
    <div class="flex-1-hidden h-full flex-y-center">
      <NButton @click="layoutStore.toggleSiderCollapsed">切换</NButton>
    </div>
    <div class="flex justify-end h-full">用户Icon</div>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
