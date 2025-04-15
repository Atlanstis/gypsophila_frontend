import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  // 这里可以添加更多路由
];

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
  await router.isReady();
}
