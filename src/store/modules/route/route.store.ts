import type { RouteRecordRaw } from 'vue-router';

import { RouteName } from '@/constants';
import { Layouts } from '@/layouts';
import { functionalRoutes, router } from '@/router';
import { useAuthStore } from '@/store';

function testAuthInfo(): Promise<{
  error: null;
  data: { id: string; username: string; menus: string[] };
}> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ error: null, data: { id: '1', username: 'admin', menus: ['Home'] } });
    }, 1000);
  });
}

const testAuthRoute: RouteRecordRaw = {
  path: '/home',
  component: Layouts.Management,
  redirect: '/home',
  children: [
    {
      path: '',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
    },
  ],
};

export const useRouteStore = defineStore('route', () => {
  /** 是否初始化权限路由 */
  const isInitAuthRoute = ref<boolean>(false);

  async function initAuthRoute() {
    const { error } = await testAuthInfo();
    if (!error) {
      addAuthRoutes();
      updateRootRedirect(testAuthRoute.path);
      isInitAuthRoute.value = true;
    } else {
      const authStore = useAuthStore();
      authStore.resetAuthStore();
    }
  }

  /**
   * 添加权限路由
   */
  function addAuthRoutes() {
    router.addRoute(testAuthRoute);
  }

  /**
   * 更新根路由重定向
   * @param path 重定向路径
   */
  function updateRootRedirect(path: string) {
    const rootRoute: RouteRecordRaw = {
      path: '/',
      name: 'Root',
      redirect: path,
    };
    router.removeRoute(RouteName.Root);
    router.addRoute(rootRoute);
  }

  /**
   * 重置权限路由
   */
  function resetAuthRoute() {
    const routes = router.getRoutes();
    const constantRouteNames = functionalRoutes.map(route => route.name);
    routes.forEach(route => {
      if (!route.name) return;
      if (!constantRouteNames.includes(route.name)) {
        router.removeRoute(route.name);
      } else {
        // 重置根路由
        const RootRoute = functionalRoutes.find(route => route.name === RouteName.Root);
        if (RootRoute) {
          router.addRoute(RootRoute);
        }
      }
    });
    isInitAuthRoute.value = false;
  }

  function resetRouteStore() {
    resetAuthRoute();
  }

  return {
    isInitAuthRoute,
    initAuthRoute,
    resetRouteStore,
  };
});
