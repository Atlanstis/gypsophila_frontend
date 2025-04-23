import type { RouteRecordRaw } from 'vue-router';

import { RouteName } from '@/enums';

export const functionalRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Root,
    redirect: '/login',
  },
  {
    path: '/login',
    name: RouteName.Login,
    component: () => import('@/views/functional/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.NotFound,
    component: () => import('@/views/functional/not-found/index.vue'),
    meta: {
      title: '404',
    },
  },
];
