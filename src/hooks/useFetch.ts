import { useWrapperRef } from './useWrapperRef';
import { type Ref, type UnwrapRef, isRef } from 'vue';

type TUseFetchPreset<P, R> = {
  immediate?: boolean;
  params?: Ref<P> | P;
  onSuccess?: (_res: R) => any;
  onError?: (_error: any) => any;
};
type DataType<T> = T extends { data: infer D } ? D : any;

export function useFetch<P, R>(api: Function, preset?: TUseFetchPreset<P, R>) {
  const { immediate, params, onSuccess, onError } = Object.assign(
    {
      immediate: false,
      params: undefined,
      onSuccess: (_res: R) => {},
      onError: (_err: any) => {},
    },
    preset ?? ({} as any)
  );

  const [loading, setLoading] = useWrapperRef(false);
  const [res, setRes] = useWrapperRef<R | undefined>(undefined);
  const [resData, setResData] = useWrapperRef<DataType<R> | undefined>(undefined);
  const [error, setError] = useWrapperRef<any>(undefined);

  const fetchResource = async (fetchParams?: UnwrapRef<P>): Promise<R> => {
    try {
      setLoading(true);
      const apiRes = await api(
        fetchParams === undefined ? (isRef(params) ? (params as Ref).value : params) : fetchParams
      );
      setRes(apiRes);
      setResData(apiRes?.data);
      setLoading(false);
      onSuccess(res.value as R);
      return res.value! as R;
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
