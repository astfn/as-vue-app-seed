import { asEnum } from 'as-enum';
import { RouteMeta, RouteRecordRaw } from 'vue-router';

type MyRouteRecordRawMetaInfo = RouteMeta & {
  title?: string;
  notNeedLoginPage?: boolean;
  global_nav_show?: boolean;
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
      children: [
        {
          path: '/login',
          component: () => import('@/views/Login/index.vue'),
          meta: { title: '登录页', global_nav_show: false, global_tabbar_show: false },
        },
      ],
    }),
  ],
  [
    'Homepage',
    genRouteConfigItem({
      path: '/homepage',
      component: () => import('@/views/Homepage/index.vue'),
      meta: { title: '首页' },
    }),
  ],
] as const);

export const routes = RoutesEnumOptions.values;
