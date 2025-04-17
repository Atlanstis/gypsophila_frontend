import { ref } from 'vue';

import { defineStore } from 'pinia';

/**
 * 侧边栏状态
 */
const useSider = () => {
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

  return {
    siderCollapse,
    toggleSiderCollapsed,
  };
};

/**
 * 底部栏状态
 */
const useFooter = () => {
  /**
   * 底部栏是否显示
   */
  const footerVisible = ref(true);

  /**
   * 切换底部栏显示状态
   */
  function toggleFooterVisible() {
    footerVisible.value = !footerVisible.value;
  }

  return {
    footerVisible,
    toggleFooterVisible,
  };
};

/**
 * 管理后台布局状态
 */
export const useManagementLayoutStore = defineStore('managementLayout', () => {
  const { siderCollapse, toggleSiderCollapsed } = useSider();

  const { footerVisible, toggleFooterVisible } = useFooter();

  return {
    siderCollapse,
    toggleSiderCollapsed,
    footerVisible,
    toggleFooterVisible,
  };
});
