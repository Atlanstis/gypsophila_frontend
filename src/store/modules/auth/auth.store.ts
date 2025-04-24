import { computed, nextTick, ref } from 'vue';

import { defineStore } from 'pinia';

import { useBoolean, useRouterPush, useStorageTyped } from '@/composables';
import { useRouteStore } from '@/store';
import { rsaEncrypt } from '@/utils';

type IUser = {
  id: string;
  usernname: string;
};

export const useAuthStore = defineStore('auth', () => {
  const { value: token, clear: clearTokenStore } = useStorageTyped('token', {
    accessToken: '',
    refreshToken: '',
  });
  /** 用户信息 */
  const user = ref<IUser | null>(null);

  const publicKey = ref<string>(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApL4e0zrJkIZLicNHifaC
DdlmV0wOTYt5nAZTnv/PGgpz2yerYbRCnyYoq7vgGT6bovRA05qaOFeQQEhNVsIy
DDZ+t/3A22l3CYXVrEkKxobZSe7hyHyTx8HRmj9eEZ2yqKJWLHTQAELi7CVV9McK
fgUM2IpbYa0jT3ic6rlA473JywVTNHgm+YDfq0/aBlz+2Z3yokHNNOU9a2hjVI9K
+7ZdE+zG16BRhMZxI4MzBAA/UZciB3L/1q7hQ3529jbRBpKadQMdaPFuCThVNI+m
UIQvcDK3f4OjOe7DWr9bDCgbDo/A4ULLgfHEsaJFjr71YghzCLD7OjJNgdvAZvsV
jQIDAQAB
-----END PUBLIC KEY-----
`);

  /** 是否登录 */
  const isLogin = computed(() => !!token.value.accessToken);

  const { bool: loginLoading, setTrue: startLogin, setFalse: stopLogin } = useBoolean(false);

  /** 用户名密码登录
   * @param username - 用户名
   * @param password - 密码
   */
  async function loginByUsername(username: string, password: string) {
    startLogin();
    const passwordEncrypted = rsaEncrypt(password, publicKey.value);
    console.log('Login By Username', username, passwordEncrypted);
    await new Promise(resolve => setTimeout(resolve, 1000));
    token.value = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    stopLogin();
    await afterLogin();
  }

  /**
   * 登录后操作
   */
  async function afterLogin() {
    const route = useRouteStore();
    // 获取授权路由
    await route.initAuthRoute();
    const { toLoginRedirect } = useRouterPush(false);
    // 跳转登录后的地址
    toLoginRedirect();
  }

  /**
   * 重置认证状态
   */
  function resetAuthStore() {
    user.value = null;
    clearTokenStore();
    const { toLogin } = useRouterPush(false);
    toLogin();
    nextTick(() => {
      const { resetRouteStore } = useRouteStore();
      resetRouteStore();
    });
  }

  return { user, isLogin, loginByUsername, loginLoading, resetAuthStore };
});
