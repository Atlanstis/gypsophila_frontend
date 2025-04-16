import { ref } from 'vue';

import { defineStore } from 'pinia';

/**
 * 管理后台布局状态
 */
export const useManagementLayoutStore = defineStore('managementLayout', () => {
  /**
   * 侧边栏是否折叠
   */
  const siderCollapse = ref(false);

  /**
   * 切换侧边栏折叠状态
   */
  function toggleSiderCollapsed() {
    siderCollapse.value = !siderCollapse.value;
  }

  /**
   * 底部是否显示
   */
  const footerVisible = ref(true);

  /**
   * 切换底部显示状态
   */
  function toggleFooterVisible() {
    footerVisible.value = !footerVisible.value;
  }

  return {
    siderCollapse,
    toggleSiderCollapsed,
    footerVisible,
    toggleFooterVisible,
  };
});
