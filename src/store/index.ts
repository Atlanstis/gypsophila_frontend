import type { App } from 'vue';

import { createPinia } from 'pinia';

/**
 * 安装 vue 状态管理插件：pinia
 * @param app createApp() 实例
 */
export function setupStore(app: App) {
  const store = createPinia();
  app.use(store);
}

export * from './modules';
