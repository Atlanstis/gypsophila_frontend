<script lang="ts" setup>
defineOptions({
  name: 'ManagementLayoutSider',
});
</script>

<template>
  <div :class="['layout-sider', 'flex-col h-full bg-white']">
    <div class="h-56px flex-center flex-shrink-0">Logo</div>
    <div class="flex-grow-1 overflow-hidden">菜单栏</div>
  </div>
</template>

<style lang="scss" scoped>
.layout-sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
