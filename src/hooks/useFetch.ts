import { BetterRequestConfig } from '@/service/request';
import { useWrapperRef } from './useWrapperRef';
import { type Ref, type UnwrapRef, isRef } from 'vue';
import { TApiRes, TCallApiRes } from '@/common/types';

type TUseFetchPreset<P, D> = {
  immediate?: boolean;
  params?: Ref<P> | P;
  requestConfig?: BetterRequestConfig;
  onSuccess?: (_res: TApiRes<D>) => any;
  onError?: (_error: any) => any;
};

type TApiFunc<P, D> = (data: P, requestConfig?: BetterRequestConfig) => TCallApiRes<D>;
export function useFetch<P, D>(api: TApiFunc<P, D>, preset?: TUseFetchPreset<P, D>) {
  const {
    immediate,
    params,
    onSuccess,
    onError,
    requestConfig = {},
  }: TUseFetchPreset<P, D> = {
    ...{
      immediate: false,
      params: undefined,
      onSuccess: () => {},
      onError: () => {},
    },
    ...(preset ?? {}),
  };

  const [loading, setLoading] = useWrapperRef(false);
  const [res, setRes] = useWrapperRef<TApiRes<D> | undefined>(undefined);
  const [resData, setResData] = useWrapperRef<D | undefined>(undefined);
  const [error, setError] = useWrapperRef<any>(undefined);

  const fetchResource = async (fetchParams?: UnwrapRef<P>): ReturnType<TApiFunc<P, D>> => {
    try {
      setLoading(true);
      const apiRes = await api(
        fetchParams === undefined ? (isRef(params) ? (params as Ref).value : params) : fetchParams,
        requestConfig
      );
      setRes(apiRes);
      setResData(apiRes?.data);
      setLoading(false);
      const resValue = res.value as TApiRes<D>;
      onSuccess(resValue);
      return resValue;
    } catch (error) {
      setLoading(false);
      onError(error);
      setError(error);
      throw error;
    }
  };
  immediate && fetchResource();

  return {
    fetchResource,
    loading,
    res,
    resData,
    error,
  };
}
