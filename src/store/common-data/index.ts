import { defineStore } from 'pinia';
import { useSystemCode } from './useSystemCode';
import { useNavTitle } from './useNavTitle';

export const useCommonDataStore = defineStore('common-data', () => {
  const systemCodeApis = useSystemCode();
  const navTitleApis = useNavTitle();
  return { ...navTitleApis, ...systemCodeApis };
});
