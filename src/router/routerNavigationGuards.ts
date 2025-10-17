import { showDialog } from 'vant';
import { authController } from '@/local-cache-data';
import { clearLocalLoginInfoCache } from '@/utils';
import { RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router';
import { useUserStore } from '@/store';
import { qsParseAssertString } from '@vmono/utils';
import { GlobalControlJumpPathOptions } from '@/router/routesConfig';

export type TThrowLoginExpireMessagePayload = {
  thenLogic: Function;
};

export function genRouterNavigationGuards(router: Router) {
  const toLoginPageCommonLogic = () => {
    clearLocalLoginInfoCache();
    router.push(GlobalControlJumpPathOptions.login.value);
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

  const handleJumpNormalPage = async (params: {
    from: RouteLocationNormalizedLoadedGeneric;
    to: RouteLocationNormalizedGeneric;
  }) => {
    const UserStore = useUserStore();
    const { from, to } = params;
    const { token: tokenInQuery } = to.query;
    const { code } = qsParseAssertString(['code']);
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
      if (to.path != GlobalControlJumpPathOptions.loginExpired.value) {
        UserStore.setLoginedJump2Url(`${window.location.origin}${from.fullPath}`);
        clearLocalLoginInfoCache();
        return { path: GlobalControlJumpPathOptions.loginExpired.value };
      }
    }
  };

  /**
   * 全局路由前置守卫
   * */
  router.beforeEach(async (to, from) => {
    // 微信公众号授权登录跳转
    if (to.path === '/wxauth') {
      const mobileUrl = import.meta.env.VITE_MOBILE_BASE_URL;
      const { url } = to.query;
      if (!(url as string).includes(mobileUrl)) {
        return {
          path: GlobalControlJumpPathOptions.login.value,
        };
      }
      const { code } = qsParseAssertString(['code']);
      window.location.href = url + '?code=' + code;
      return;
    }

    if (to.path == GlobalControlJumpPathOptions.login.value) {
      clearLocalLoginInfoCache();
      return;
    } else {
      return handleJumpNormalPage({ from, to });
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
