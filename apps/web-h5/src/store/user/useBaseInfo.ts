import { getUserBaseInfo, TGetUserBaseInfoResData } from '@/apis/user';
import { useWrapperRef } from '@/hooks';
import { AES_Dencrypt } from '@/utils';
import { computed } from 'vue';

const getDefaultBaseInfoValue = <T>() => {
  return {} as T;
};

export function useBaseInfo() {
  /**
   * states
   */
  const [baseInfo, setBaseInfo] = useWrapperRef<TGetUserBaseInfoResData>(getDefaultBaseInfoValue());

  /**
   * getters
   */
  const decryptDisplayInfo = computed(() => {
    return {
      mobileNo: AES_Dencrypt(baseInfo.value.mobileNo),
    };
  });

  /**
   * actions
   */
  const removeBaseInfo = () => {
    setBaseInfo(getDefaultBaseInfoValue());
  };

  const fetchUserBaseInfo = async () => {
    const { data } = (await getUserBaseInfo()) ?? {};
    setBaseInfo(data);
  };

  return {
    baseInfo,
    setBaseInfo,
    decryptDisplayInfo,
    fetchUserBaseInfo,
    removeBaseInfo,
  };
}
