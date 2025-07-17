import { TCallApiRes } from '@/common/types';
import { BetterRequestConfig } from '@/service/request';
// import { customRequest } from '@/service';

export type TGetUserBaseInfoResData = { mobileNo: string };
export function getUserBaseInfo(
  _data?: undefined,
  _requestConfig?: BetterRequestConfig
): TCallApiRes<TGetUserBaseInfoResData> {
  // return customRequest.get({
  //   url: '/user/info',
  //   ...(requestConfig ?? {}),
  // });
  return Promise.resolve({ data: { mobileNo: 'mobileNo' } }) as any;
}
