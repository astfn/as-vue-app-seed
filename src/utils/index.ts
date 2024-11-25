import { authController } from '@/local-cache-data';
import { useUserStore } from '@/store';
import xssPackage, { IFilterXSSOptions } from 'xss';

export * from './validate';
export * from './format';

export function clearLocalCache() {
  const UserStore = useUserStore();
  UserStore.removeBaseInfo();
  authController.delAutn();
}

/**
 * xss
 */
const whiteList = JSON.parse(JSON.stringify((xssPackage as IFilterXSSOptions).whiteList));
Object.keys(whiteList).forEach((key) => {
  whiteList[key].push('style');
});
// @ts-ignore
export const xssUtil = new xssPackage.FilterXSS({
  whiteList,
  css: false,
});
