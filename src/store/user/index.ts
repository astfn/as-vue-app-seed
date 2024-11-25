import { defineStore } from 'pinia';
import { useBaseInfo } from './useBaseInfo';
import { useLoginedJump2Url } from './useLoginedJump2Url';

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
