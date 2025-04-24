import { type RouteLocationRaw, useRouter } from 'vue-router';

import { RouteName } from '@/constants';
import { router as globalRouter } from '@/router';

/**
 * 路由跳转
 * @param isInSetup - 是否在 vue 页面/组件的 setup 里面调用，例如在 axios 里面使用 useRouter 和 useRoute 将返回 undefined
 */
export function useRouterPush(isInSetup = true) {
  const router = isInSetup ? useRouter() : globalRouter;
  const route = router.currentRoute;

  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param newTab - 是否在新的浏览器标签中打开
   */
  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const { href } = router.resolve(to);
      window.open(href, '_blank');
      return Promise.resolve();
    }
    return router.push(to);
  }

  /** 返回上一页 */
  function goBack() {
    return router.go(-1);
  }

  /**
   * 跳转首页
   * @param newTab - 是否在新的浏览器标签中打开
   */
  function toHome(newTab = false) {
    routerPush({ name: RouteName.Root }, newTab);
  }

  /**
   * 登录成功后跳转重定向的地址
   */
  function toLoginRedirect() {
    const { query } = route.value;
    if (query?.redirect) {
      routerPush(query.redirect as string);
    } else {
      toHome();
    }
  }

  /**
   * 跳转登录页面
   * @param redirectUrl - 重定向地址(登录成功后跳转的地址)，默认 undefined 表示取当前地址为重定向地址
   */
  function toLogin(redirectUrl?: string) {
    const routeLocation: RouteLocationRaw = {
      name: RouteName.Login,
    };
    const redirect = redirectUrl === undefined ? route.value.fullPath : redirectUrl;

    // 添加跳转信息
    if (redirect) {
      Object.assign(routeLocation, { query: { redirect } });
    }
    routerPush(routeLocation);
  }

  return {
    goBack,
    routerPush,
    toLogin,
    toHome,
    toLoginRedirect,
    router,
    route,
  };
}
