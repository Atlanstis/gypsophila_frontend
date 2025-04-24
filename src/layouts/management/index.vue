<script lang="ts" setup>
import { LayoutContent, LayoutFooter, LayoutHeader, LayoutSider, LayoutTab } from './components';
import style from './index.module.css';
import { useManagementLayoutStore } from './store';

defineOptions({
  name: 'ManagementLayout',
});

const cssVars = {
  '--management-header-height': '56px',
  '--management-header-z-index': 97,
  '--management-tab-height': '44px',
  '--management-tab-z-index': 95,
  '--management-sider-width': '220px',
  '--management-sider-collapsed-width': '64px',
  '--management-sider-z-index': 99,
  '--management-footer-height': '48px',
  '--management-footer-z-index': 95,
};

const layoutStore = useManagementLayoutStore();

const leftGapClass = computed(() => {
  return layoutStore.siderCollapse ? style['left-gap_collapsed'] : style['left-gap'];
});

const commonClass = ref('transition-all duration-300');
</script>

<template>
  <div class="relative h-full" :style="cssVars">
    <div class="flex h-full flex-col">
      <!-- 头部 -->
      <header :class="[style['layout-header'], 'flex-shrink-0', leftGapClass, commonClass]">
        <LayoutHeader />
      </header>
      <!-- 页签 -->
      <div :class="[style['layout-tab'], 'flex-shrink-0', leftGapClass, commonClass]">
        <LayoutTab />
      </div>
      <!-- 侧边栏 -->
      <aside
        :class="[
          'absolute top-0 left-0 h-full',
          layoutStore.siderCollapse ? style['layout-sider_collapsed'] : style['layout-sider'],
          commonClass,
        ]"
      >
        <LayoutSider />
      </aside>
      <!-- 主体内容 -->
      <main :class="['flex-grow overflow-hidden', leftGapClass, commonClass]">
        <LayoutContent />
      </main>
      <!-- 底部 -->
      <footer
        v-if="layoutStore.footerVisible"
        :class="[style['layout-footer'], 'flex-shrink-0', leftGapClass, commonClass]"
      >
        <LayoutFooter />
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
