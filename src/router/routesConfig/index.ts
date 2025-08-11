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

const genRouteConfigItem = (config: TEnhanceRecordRaw) => config;

export const RoutesEnumOptions = asEnum([
  [
    'Root',
    genRouteConfigItem({
      path: '/',
      redirect: '/login',
    }),
  ],
  [
    'Login',
    genRouteConfigItem({
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: { title: '登录页', global_nav_show: false, global_tabbar_show: false },
    }),
  ],
  [
    'Homepage',
    genRouteConfigItem({
      path: '/homepage',
      component: () => import('@/views/Homepage/index.vue'),
      meta: { title: '首页', global_nav_show_arrow: false },
    }),
  ],
  [
    'MyHomepage',
    genRouteConfigItem({
      path: '/myHomepage',
      component: () => import('@/views/MyHomepage/index.vue'),
      meta: { title: '我的' },
    }),
  ],
  [
    'CustomTabBarPage',
    genRouteConfigItem({
      path: '/customTabBarPage',
      component: () => import('@/views/CustomTabBarPage.vue'),
      meta: { title: 'CustomTabBarPage', global_tabbar_show: false },
    }),
  ],
] as const);

export const routes = RoutesEnumOptions.values;
