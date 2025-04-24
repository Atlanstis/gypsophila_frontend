import type { RouteRecordRaw } from 'vue-router';

import { RouteName, RoutePath } from '@/constants';

/**
 * 功能路由
 */
export const functionalRoutes: RouteRecordRaw[] = [
  {
    path: RoutePath.Root,
    name: RouteName.Root,
    redirect: RoutePath.Login,
  },
  {
    path: RoutePath.Login,
    name: RouteName.Login,
    component: () => import('@/views/functional/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: RoutePath.NotFound,
    name: RouteName.NotFound,
    component: () => import('@/views/functional/not-found/index.vue'),
    meta: {
      title: '404',
    },
  },
];
