import { defineStore } from 'pinia';
import { useNavAndTabBarInfo } from './useNavAndTabBarInfo';

export const useLayoutInfoStore = defineStore('layout-info', () => {
  const navAndTabBarInfoApis = useNavAndTabBarInfo();

  return { ...navAndTabBarInfoApis };
});
