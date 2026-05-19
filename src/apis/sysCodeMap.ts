import { TCallApiRes } from '@/common/types';
import { customRequest } from '@/service/index';
import { BetterRequestConfig } from '@/service/request';

export type TSysCodeEnumItem = {
  label: string;
  value: any;
  desc?: string;
};
export type TGetSysCodeMapResData = {
  [key: string]: TSysCodeEnumItem[];
};
export const getSysCodeMap = (_data?, requestConfig?: BetterRequestConfig): TCallApiRes<TGetSysCodeMapResData> => {
  requestConfig;
  customRequest;
  return Promise.resolve({} as any);
  // return customRequest.post({
  //   url: `/h5/sysCodeMap`,
  //   ...(requestConfig ?? {}),
  // });
};
