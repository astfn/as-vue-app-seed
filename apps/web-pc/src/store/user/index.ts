import { defineStore } from 'pinia';
import { useBaseInfo } from './useBaseInfo';
import { useLoginedJump2Url } from '@as-vue-app-seed/stores';

export const useUserStore = defineStore(
  'user',
  () => {
    const baseInfoApis = useBaseInfo();
    const loginedJump2UrlApis = useLoginedJump2Url();

    return { ...baseInfoApis, ...loginedJump2UrlApis };
  },
  {
    persist: true,
  }
);
