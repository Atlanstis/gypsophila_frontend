<script lang="ts" setup>
defineOptions({
  name: 'ManagementLayoutSider',
});
</script>

<template>
  <div :class="['layout-sider', 'flex h-full flex-col bg-white']">
    <div class="flex h-[56px] flex-shrink-0 items-center justify-center">Logo</div>
    <div class="flex-grow-1 overflow-hidden">菜单栏</div>
  </div>
</template>

<style lang="scss" scoped>
.layout-sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
