import type { GenerateServiceProps } from 'openapi-ts-request';

export default [
  {
    // 导出的接口文件路径或URL
    schemaPath: './src/apis/openapi-ts-tpls/apis.openapi.json',
    // 生成的代码文件
    serversPath: './src/apis/openapi-ts-modules',
    // 自己封装的 axios 函数的路径
    requestLibPath: '@/service/index',
  },
] as GenerateServiceProps[];
