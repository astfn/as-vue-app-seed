import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import { routesConfig } from './routesConfig';
import { genRouterNavigationGuards } from './routerNavigationGuards';
export * from './routerNavigationGuards';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routesConfig as RouteRecordRaw[],
});

export const { toLoginPageCommonLogic, throwLoginExpireMessage } = genRouterNavigationGuards(router);
export default router;
