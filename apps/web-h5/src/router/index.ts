import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import { routes } from './routesConfig';
import { genRouterNavigationGuards } from './routerNavigationGuards';
export * from './routerNavigationGuards';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
});

export const { toLoginPageCommonLogic, throwLoginExpireMessage } = genRouterNavigationGuards(router);
export default router;
