import { customRequest } from '@/service';

export function testApi(params: any) {
  return customRequest.get({
    url: 'http://localhost:3000/api/items',
    params,
    sameReqIsShareResult: true,
    interceptors: {
      requestInterceptorFulfilled(config) {
        // console.log('testlala 接口层的 requestInterceptorFulfilled😁');
        return config;
      },
      requestInterceptorRejected() {
        // console.log('testlala 接口层的 requestInterceptorRejected😅');
      },
      responseInterceptorFulfilled(data) {
        // console.log('testlala 接口层的 responseInterceptorFulfilled😁😁');
        return data;
      },
      responseInterceptorRejected() {
        // console.log('testlala 接口层的 responseInterceptorRejected😅😅');
      },
    },
  });
}
