import { authController } from '@/local-cache-data';
import { useUserStore } from '@/store';
import { cloneDeep } from 'lodash';
import { FilterXSS, whiteList } from 'xss';

export * from './validate';
export * from './format';
export function clearLocalLoginInfoCache() {
  const UserStore = useUserStore();
  UserStore.removeBaseInfo();
  authController.delAutn();
}

/**
 * xss
 */
const enhanceWhiteList = cloneDeep(whiteList);
Object.keys(enhanceWhiteList).forEach((key) => {
  if (enhanceWhiteList[key]) {
    enhanceWhiteList[key].push('style');
  }
});
export const xssUtil = new FilterXSS({
  whiteList: enhanceWhiteList,
  css: false,
});
