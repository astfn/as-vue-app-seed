import { TCallApiRes } from '@/common/types';
import { customRequest } from '@/service';
import { BetterRequestConfig, RequestStrategyEnum } from '@/service/request';

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

export type TGetMockResData = { name: string; age: number };
export type TGetMockParams = { keywords: string; param2: number };
export async function getMock(
  data: TGetMockParams,
  _requestConfig?: BetterRequestConfig
): TCallApiRes<TGetMockResData> {
  // return customRequest.get({
  //   url: '/user/info',
  //   ...(requestConfig ?? {}),
  // });
  const delay = data.param2 > 2 ? 1e3 : 5e3;
  // console.log('getMock params', data.param2, delay, data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '成功啦！',
        data: { name: `Ashun${data.param2}`, age: 18 },
      });
    }, delay);
  });
}

/**
 * 模拟分页请求方法
 * @param {number} pageNum - 当前页码（从 1 开始）
 * @param {number} pageSize - 每页数量，默认 10
 * @param {number} total - 总数据条数
 * @returns {{list: Array, pagination: {pageNum: number, pageSize: number, total: number, totalPages: number}}}
 */

export function mockPaginateRequest<TListItem>(p: {
  genItem(i: number): TListItem;
  pageNum?: number;
  pageSize?: number;
  total?: number;
}) {
  const { pageNum: _pageNum = 1, pageSize = 10, total = 63, genItem } = p;

  // 计算总页数
  const totalPages = Math.ceil(total / pageSize);

  // 确保 pageNum 合法
  const pageNum = Math.max(1, Math.min(_pageNum, totalPages));

  // 生成模拟数据（例如：从 1 到 63 的 ID）
  const allData = Array.from({ length: total }, (_, i) => genItem(i));

  // 计算起始索引和结束索引
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;

  // 分页数据
  const paginatedData = allData.slice(start, end);

  return {
    list: paginatedData,
    pagination: {
      pageNum,
      pageSize,
      total,
      totalPages,
    },
  };
}

export type TListMockItem = { id: string; name: string };
export type TGetListMockFuncParams = { pageNum: number; pageSize: number };
export async function getListMockFunc(
  data: TGetListMockFuncParams,
  _requestConfig?: BetterRequestConfig
): TCallApiRes<TListMockItem[]> {
  // return customRequest.get({
  //   url: '/user/info',
  //   ...(requestConfig ?? {}),
  // });
  const res = mockPaginateRequest({
    ...data,
    genItem: (i) => ({ id: `${i + 1}`, name: `用户 ${i + 1}` }),
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '成功啦！',
        data: res.list,
        total: res.pagination.total,
      });
    }, 1e3);
  });
}
