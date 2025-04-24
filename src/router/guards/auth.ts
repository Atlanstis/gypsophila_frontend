import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';

import { RouteName, RoutePath } from '@/constants';
import { useAuthStore, useRouteStore } from '@/store';
import { type IStrategyAction, exeStrategyActions } from '@/utils';

/**
 * 权限守卫
 * @param router vue-router 实例
 */
export function setupAuthGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    // 判断是否存在权限，存在则通过
    const permission = await judgePermission(to, next);
    if (!permission) return;

    const auth = useAuthStore();
    const isLogin = auth.isLogin;

    const actions: IStrategyAction[] = [
      /** 已登录时前往登录页，跳转至首页 */
      [isLogin && to.name === RouteName.Login, () => next({ name: RouteName.Root, replace: true })],
      /** 已登录，前往其他页面，放行 */
      [isLogin, () => next()],
    ];
    exeStrategyActions(actions);
  });
}

/**
 * 判断权限
 * @param to 路由对象
 * @param next 导航守卫函数
 * @returns 是否通过
 */
async function judgePermission(to: RouteLocationNormalized, next: NavigationGuardNext) {
  const auth = useAuthStore();
  const route = useRouteStore();
  if (!route.isInitAuthRoute) {
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!auth.isLogin) {
      if (to.name === RouteName.Login) {
        next();
      } else {
        const redirect = to.fullPath;
        next({ name: RouteName.Login, query: { redirect }, replace: true });
      }
      return false;
    }
    // 初始化权限路由
    await route.initAuthRoute();
    if (to.name === RouteName.NotFound) {
      // 动态路由没有加载导致被not-found路由捕获，等待权限路由加载好了，回到之前的路由
      // 若路由是从根路由重定向过来的，重新回到根路由
      const path = to.redirectedFrom?.name === RouteName.Root ? RoutePath.Root : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }
  return true;
}
