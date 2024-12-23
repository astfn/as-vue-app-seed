import { TCallApiRes } from '@/common/types';
// import { customRequest } from '@/service';

export type TGetUserBaseInfoResData = { mobileNo: string };
export function getUserBaseInfo(): TCallApiRes<TGetUserBaseInfoResData> {
  // return customRequest
  //   .get({
  //     url: '/user/info',
  //   })
  return Promise.resolve({ data: { mobileNo: 'mobileNo' } }) as any;
}
