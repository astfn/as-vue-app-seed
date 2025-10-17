import { asEnum } from 'as-enum';
import { RouteMeta, RouteRecordRaw } from 'vue-router';

type MyRouteRecordRawMetaInfo = RouteMeta & {
  title?: string;
  notNeedLoginPage?: boolean;
  global_nav_show?: boolean;
  global_nav_show_arrow?: boolean;
  global_tabbar_show?: boolean;
};
export type TEnhanceRecordRaw = Omit<RouteRecordRaw, 'meta'> & { meta?: MyRouteRecordRawMetaInfo };

export const GlobalControlJumpPathOptions = asEnum([
  // 登陆相关
  ['login', '/login'],
  ['loginExpired', '/login-expired'],
  // 首页 & tabbar
  ['homepage', '/homepage'],
  ['personalCenter', '/personal-center'],
] as const);

export const routesConfig: TEnhanceRecordRaw[] = [
  {
    path: '/',
    redirect: GlobalControlJumpPathOptions.login.value,
  },
  {
    path: GlobalControlJumpPathOptions.login.value,
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录页', global_nav_show: false, global_tabbar_show: false },
  },
  {
    path: GlobalControlJumpPathOptions.loginExpired.value,
    component: () => import('@/views/Login/LoginExpired.vue'),
    meta: { title: '登陆过期', notNeedLoginPage: true, global_nav_show: false, global_tabbar_show: false },
  },
  {
    path: GlobalControlJumpPathOptions.homepage.value,
    component: () => import('@/views/Homepage/index.vue'),
    meta: { title: '首页', global_nav_show_arrow: false },
  },
  {
    path: GlobalControlJumpPathOptions.personalCenter.value,
    component: () => import('@/views/PersonalCenter/index.vue'),
    meta: { title: '我的' },
  },
  {
    path: '/customTabBarPage',
    component: () => import('@/views/CustomTabBarPage.vue'),
    meta: { title: 'CustomTabBarPage', global_tabbar_show: false },
  },
];
