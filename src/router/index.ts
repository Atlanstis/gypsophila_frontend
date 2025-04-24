import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import { functionalRoutes } from './functional';
import { setupGuards } from './guards';

const routes = [...functionalRoutes];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * 安装 vue 路由
 * @param app vue 实例
 */
export async function setupRouter(app: App) {
  app.use(router);
  setupGuards(router);
  await router.isReady();
}

export * from './functional';
