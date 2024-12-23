import { authController } from '@/local-cache-data';
import { BetterRequest, BetterRequestInstanceInterceptors } from './request';

const interceptors: BetterRequestInstanceInterceptors = {
  requestInterceptorFulfilled: (config) => {
    // console.log('外部配置的公共 requestInterceptor');
    const authToken = authController.getAuth();
    if (authToken) {
      config!.headers!.Authorization = authToken;
    }
    return config;
  },
  // requestInterceptorRejected: (err) => {
  //   // console.log('外部配置的公共 requestInterceptorRejected');
  //   return Promise.reject(err);
  // },
  // responseInterceptorFulfilled: (res) => {
  //   // console.log('外部配置的公共 responseInterceptorFulfilled');
  //   return res;
  // },
  // responseInterceptorRejected(err) {
  //   // console.log('外部配置的公共 responseInterceptorRejected');
  //   return Promise.reject(err);
  // },
};

export const customRequest = new BetterRequest({
  config: {
    baseURL: import.meta.env.VITE_REQ_BASE_URL,
    timeout: 1000 * 60 * 30,
  },
  interceptors,
});
