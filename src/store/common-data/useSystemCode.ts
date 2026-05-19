import { getSysCodeMap } from '@/apis/sysCodeMap';
import { useRequest } from '@vmono/vhooks';
import { computed } from 'vue';
export function useSystemCode() {
  /**
   * actions
   */
  const {
    runAsync: fetchSysCodeMap,
    loading: fetchSysCodeLoading,
    data: sysCodeMap,
  } = useRequest(getSysCodeMap, { manual: true });

  /**
   * getters
   */
  const getTargetSysCode = computed(() => {
    return (key: string) => {
      return (sysCodeMap.value ?? {})?.[key] ?? [];
    };
  });

  const getTargetSysCodeLabel = computed(() => {
    return (p: { key: string; value: any }) => {
      const { key, value } = p;
      const targetSysCode = getTargetSysCode.value(key);
      const option = targetSysCode.find((item) => item.value == value);
      return option?.label ?? '';
    };
  });

  return {
    sysCodeMap,
    fetchSysCodeMap,
    fetchSysCodeLoading,
    getTargetSysCode,
    getTargetSysCodeLabel,
  };
}
