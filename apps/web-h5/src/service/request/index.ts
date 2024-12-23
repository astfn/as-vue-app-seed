import { throwLoginExpireMessage } from '@/router';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { showFailToast } from 'vant';

export type BetterRequestInstanceInterceptors = {
  requestInterceptorFulfilled?: (_reqConfig: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  requestInterceptorRejected?: (_error: any) => any;
  // responseInterceptor?: (res: T) => T
  responseInterceptorFulfilled?: <T = AxiosResponse>(_responseInfo: T) => T | Promise<T>;
  responseInterceptorRejected?: (_error: any) => any;
};

export type BetterRequestConfig = AxiosRequestConfig & {
  interceptors?: BetterRequestInstanceInterceptors;
  sameReqIsShareResult?: boolean;
};

export type BetterRequestPresets = {
  interceptors?: BetterRequestInstanceInterceptors;
  config: AxiosRequestConfig;
};

type TProcessCancel = () => Promise<any>;
export class BetterRequest {
  instance: AxiosInstance;
  requestingPromiseMap: Map<
    string,
    {
      requestSource: Promise<any>;
      processCancel?: TProcessCancel;
    }
  >;
  cancelModeRequestingPromiseQueue: Array<{ [key: string]: TProcessCancel }>;

  constructor(presets: Partial<BetterRequestPresets>) {
    const { interceptors, config } = presets;

    this.instance = axios.create(config);
    this.requestingPromiseMap = new Map();
    this.cancelModeRequestingPromiseQueue = [];

    this.instance.interceptors.request.use(
      interceptors?.requestInterceptorFulfilled as any,
      interceptors?.requestInterceptorRejected
    );
    this.instance.interceptors.response.use(
      interceptors?.responseInterceptorFulfilled,
      interceptors?.responseInterceptorRejected
    );

    this.instance.interceptors.request.use(
      (reqConfig) => reqConfig,
      (error) => error
    );
    this.instance.interceptors.response.use(
      (responseInfo) => {
        const { data, status } = responseInfo;
        const responseStatus = (responseInfo as any)?.response?.status;
        if (data?.code == 200 || status == 200 || responseStatus == 200) {
          return data;
        } else if ((responseInfo as any).code === 'ERR_CANCELED') {
          return Promise.reject('cancel error');
        }
      },
      (err: AxiosError) => {
        showFailToast((err?.response?.data as any)?.message);
        if (err.status == 401 || err?.response?.status == 401) {
          throwLoginExpireMessage();
        }
        return Promise.reject(err);
      }
    );
  }

  genRequestLogicPromise<TResult>(params: {
    config: BetterRequestConfig;
    processFinally: () => void;
  }): Promise<TResult> {
    const { config, processFinally } = params;
    return new Promise<TResult>((resolve, reject) => {
      this.instance
        .request<any, TResult>(config)
        .then(
          (res) => {
            if (config?.interceptors?.responseInterceptorFulfilled) {
              config?.interceptors?.responseInterceptorFulfilled(res);
            }
            resolve(res);
          },
          (err) => {
            if (config?.interceptors?.responseInterceptorRejected) {
              config?.interceptors?.responseInterceptorRejected(err);
            }
            reject(err);
          }
        )
        .finally(processFinally);
    });
  }
  sameReqShareResultRequest<TResult>(config: BetterRequestConfig): Promise<TResult> {
    try {
      config?.interceptors?.requestInterceptorFulfilled?.(config);

      let requestSource;
      const preMatchId = structureRequestingPromiseMapIdByConfig(config);
      const sameReq = this.requestingPromiseMap.get(preMatchId);
      if (sameReq) {
        requestSource = sameReq?.requestSource;
      } else {
        requestSource = this.genRequestLogicPromise({
          config,
          processFinally: () => {
            this.requestingPromiseMap.delete(preMatchId);
          },
        });
        this.requestingPromiseMap.set(preMatchId, { requestSource });
      }

      // console.log(
      //   'sameReqShareResultRequest requestingPromiseMap.length',
      //   Array.from(this.requestingPromiseMap.keys())?.length
      // );

      return requestSource;
    } catch (error) {
      config?.interceptors?.requestInterceptorRejected?.(error);
      return Promise.reject(error);
    }
  }

  getCancelMethodByConfig(config: BetterRequestConfig) {
    const { url } = config;
    if (!url) return undefined;
    const target = this.cancelModeRequestingPromiseQueue.find((item) => {
      return Object.keys(item)?.[0] == url;
    });
    return target?.[Object.keys(target ?? {})?.[0]];
  }
  deleteCancelMethodByConfig(config: BetterRequestConfig) {
    const { url } = config;
    if (!url) return;
    const findIndex = this.cancelModeRequestingPromiseQueue.findIndex((item) => {
      return Object.keys(item)?.[0] == url;
    });
    if (findIndex >= -1) this.cancelModeRequestingPromiseQueue.splice(findIndex, 1);
  }

  cancelModeRequest<TResult>(config: BetterRequestConfig): Promise<TResult> {
    try {
      config?.interceptors?.requestInterceptorFulfilled?.(config);
      const { url } = config;
      if (url) {
        const cancel = this.getCancelMethodByConfig(config);
        cancel?.();
        config.cancelToken = new axios.CancelToken((cancel) => {
          this.cancelModeRequestingPromiseQueue.push({
            [url]: () => {
              // console.log('取消请求模式生效', cancel);
              return Promise.reject(cancel());
            },
          });
        });
      }
      const requestSource = this.genRequestLogicPromise<TResult>({
        config,
        processFinally: () => {
          this.deleteCancelMethodByConfig(config);
        },
      });
      // console.log(
      //   'cancelModeRequest cancelModeRequestingPromiseQueue.length',
      //   this.cancelModeRequestingPromiseQueue
      // );
      return requestSource;
    } catch (error) {
      config?.interceptors?.requestInterceptorRejected?.(error);
      return Promise.reject(error);
    }
  }

  request<TResult>(config: BetterRequestConfig): Promise<TResult> {
    const { sameReqIsShareResult = false } = config;

    return sameReqIsShareResult ? this.sameReqShareResultRequest(config) : this.cancelModeRequest(config);
  }

  get<T = any>(config: BetterRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T = any>(config: BetterRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T = any>(config: BetterRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  put<T = any>(config: BetterRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' });
  }
}

function structureRequestingPromiseMapIdByConfig(config: BetterRequestConfig) {
  const { baseURL, url, method, headers, data, params } = config;
  return `${baseURL}${url}${method}${JSON.stringify(headers)}${JSON.stringify(data)}${JSON.stringify(params)}`;
}
