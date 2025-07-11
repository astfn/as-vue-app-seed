import { customRequest } from '@/service';
import { RequestStrategyEnum } from '@/service/request';

export function testApi(params: any) {
  return customRequest.get({
    url: 'http://localhost:3000/api/items',
    params,
    requestStrategy: RequestStrategyEnum.SameReqShareResult,
    interceptors: {
      requestInterceptorFulfilled(config) {
        console.log('testlala 接口层的 requestInterceptorFulfilled😁');
        return config;
      },
      requestInterceptorRejected() {
        console.log('testlala 接口层的 requestInterceptorRejected😅');
      },
      responseInterceptorFulfilled(data) {
        console.log('testlala 接口层的 responseInterceptorFulfilled😁😁');
        return data;
      },
      responseInterceptorRejected() {
        console.log('testlala 接口层的 responseInterceptorRejected😅😅');
      },
    },
  });
}
