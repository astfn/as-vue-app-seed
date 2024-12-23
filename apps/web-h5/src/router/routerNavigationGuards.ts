import { showDialog } from 'vant';
import { authController } from '@/local-cache-data';
import { clearLocalCache, isNullOrUndefined } from '@/utils';
import { RouteLocationNormalizedGeneric, Router } from 'vue-router';
import qs from 'query-string';
import { RoutesEnumOptions } from './routesConfig';
import { useUserStore } from '@/store';

export type TThrowLoginExpireMessagePayload = {
  thenLogic: Function;
};

export function genRouterNavigationGuards(router: Router) {
  const handleJumpLogin = () => {
    if (!isNullOrUndefined(authController.getAuth())) {
      clearLocalCache();
    }
  };

  const toLoginPageCommonLogic = () => {
    clearLocalCache();
    router.push(RoutesEnumOptions.Login.value.path);
  };

  const throwLoginExpireMessage = (payload?: Partial<TThrowLoginExpireMessagePayload>) => {
    const { thenLogic = toLoginPageCommonLogic } = payload ?? {};
    const UserStore = useUserStore();
    UserStore.setLoginedJump2Url(location.href);
    showDialog({
      title: '登录过期，请重新登录',
    }).then(() => {
      thenLogic();
    });
  };

  const handleJumpNormalPage = async (params: { to: RouteLocationNormalizedGeneric }) => {
    const { to } = params;
    const { token: tokenInQuery } = to.query;
    const { code } = qs.parse(window.location.search);
    const authToken = authController.getAuth();

    if (tokenInQuery) {
      authController.setAutn(tokenInQuery as string);
      return;
    }

    if (authToken || to.meta.notNeedLoginPage) {
      authToken && authController.setAutn(authToken);
      return;
    } else if (code) {
      // 有微信授权码
      // console.log(code, '有微信授权码');
    } else {
      throwLoginExpireMessage();
    }
  };

  /**
   * 全局路由前置守卫
   * */
  router.beforeEach(async (to, _from) => {
    // 微信公众号授权登录跳转
    if (to.path === '/wxauth') {
      const mobileUrl = import.meta.env.VITE_MOBILE_BASE_URL;
      const { url } = to.query;
      if (!(url as string).includes(mobileUrl)) {
        return {
          path: RoutesEnumOptions.Login.value.path,
        };
      }
      const { code } = qs.parse(window.location.search);
      window.location.href = (url + '?code=' + code) as string;
      return;
    }

    if (to.path == RoutesEnumOptions.Login.value.path) {
      return handleJumpLogin();
    } else {
      return handleJumpNormalPage({ to });
    }
  });

  router.onError((error, to) => {
    if (
      error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Importing a module script failed')
    ) {
      // @ts-expect-error placeholder
      window.location = to.fullPath;
    }
  });

  return { toLoginPageCommonLogic, throwLoginExpireMessage };
}
