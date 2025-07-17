// import { sm4 } from 'gm-crypt';
import CryptoJS from 'crypto-js';
import qs from 'query-string';
import { checkStrIsEmpty, isNullOrUndefined } from './validate';
import { EmptyPlaceholder } from '@/common/constants';

const AESSecretKey = /* @mangle */ 'AESSecretKey'; /* /@mangle */

export function AES_Dencrypt(word: string) {
  if (!word) return '';
  const keys = CryptoJS.enc.Utf8.parse(AESSecretKey);
  const decrypt = CryptoJS.AES.decrypt(word, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
export function AES_Encrypt(word: string) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const keys = CryptoJS.enc.Utf8.parse(AESSecretKey);
  const encrypted = CryptoJS.AES.encrypt(srcs, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const hexStr = encrypted.ciphertext.toString().toUpperCase();
  const oldHexStr = CryptoJS.enc.Hex.parse(hexStr);
  return CryptoJS.enc.Base64.stringify(oldHexStr);
}

// // const key = '7de1be9989cd4f7a';
// // const sm4Config = {
// //   key,
// //   mode: 'ecb',
// //   cipherType: 'base64',
// // };

// // const _SM4 = new sm4(sm4Config);

// //解密方法
// export function sm4Decrypt(word) {
//   return AES_Dencrypt(word)
//   // try {
//   //   if (!word) return '';
//   //   //console.log(sm4.decrypt(word));
//   //   const str = SM4.decrypt(word);
//   //   return str;
//   // } catch (err) {
//   //   console.error('sm4Decrypt 解密出错', err);
//   //   return '';
//   // }
// }

// //加密方法
// export function sm4Encrypt(word) {
//   return AES_Encrypt(word)
//   //console.log('en',word);
//   // try {
//   //   return SM4.encrypt(word);
//   // } catch (err) {
//   //   console.error('sm4Encrypt 加密出错', err);
//   //   return '';
//   // }
// }

type AliasMap<T> = {
  [key: string]: keyof T;
};
export function resolveAlias<T>(obj: T, aliasMap: AliasMap<T>): Partial<T> {
  const resolvedObj: Partial<T> = {};
  for (const key in obj) {
    if (key in aliasMap) {
      const alias = aliasMap[key];
      resolvedObj[alias] = obj[key];
    } else {
      resolvedObj[key] = obj[key];
    }
  }
  return resolvedObj;
}

export function maskShowStr(idNumber: string, frontN: number, backN: number): string {
  if (idNumber.length < frontN + backN) {
    throw new Error('字符串长度不足以进行加密');
  }

  const frontPart = idNumber.slice(0, frontN);
  const backPart = idNumber.slice(-backN);
  const maskedPart = '*'.repeat(idNumber.length - frontN - backN);

  return `${frontPart}${maskedPart}${backPart}`;
}

type TSingleValueToArrayRes<T> = T extends (infer _U)[] ? T : T extends null | undefined ? [] : T[];
export function singleValueToArray<T>(value: T): TSingleValueToArrayRes<T> {
  if (Array.isArray(value)) {
    return value as TSingleValueToArrayRes<T>;
  }
  return (isNullOrUndefined(value) ? [] : [value]) as TSingleValueToArrayRes<T>;
}

type TArrayToSingleValueRes<T> = T extends (infer U)[] ? U : T;
export function arrayToSingleValue<T>(value: T): TArrayToSingleValueRes<T> {
  if (Array.isArray(value)) {
    return value?.[0];
  }
  return value as TArrayToSingleValueRes<T>;
}

type THandleEmptyDisplayPreset = { emptyTxt: string; judgeEmptyLogic: (value: any) => boolean };
const handleEmptyDisplayDefaultPreset: THandleEmptyDisplayPreset = {
  emptyTxt: EmptyPlaceholder,
  judgeEmptyLogic: (value: any) => {
    if (checkStrIsEmpty(value)) return true;
    return false;
  },
};
/**
 * 处理空值展示
 */
export function handleEmptyDisplay(value: any, preset?: Partial<THandleEmptyDisplayPreset>) {
  const presetConfig = { ...handleEmptyDisplayDefaultPreset, ...(preset ?? {}) };
  const { emptyTxt, judgeEmptyLogic } = presetConfig;
  if (judgeEmptyLogic(value)) return emptyTxt;
  return value;
}

/**
 * 格式化数字: 保留 n 位小数
 */
export function formatToPositiveNumber(input: string | number, fractionDigits: number = 2): number | undefined {
  const num = Number(input);
  // 如果输入不是一个有效的数字，则返回 0
  if (isNaN(num)) return undefined;
  // 计算乘数以进行四舍五入
  const multiplier = Math.pow(10, fractionDigits);
  return Math.round(num * multiplier) / multiplier;
}

/**
 * 展示格式化数字:
 * 1. 输出字符串
 * 2. 判空展示占位符
 */
export const showFormatToPositiveNumber = (input: string | number, fractionDigits: number = 2): string => {
  const formatedNum = formatToPositiveNumber(input, fractionDigits);
  return formatedNum?.toFixed?.(2) ?? EmptyPlaceholder;
};

/**
 * 从 url 参数中进行枚举解析
 * 1. 支持类型转换
 * 2. 内置判空与 trim 逻辑
 *        http://localhost:8002/testpage/chidren?a=    1&b=2
 *        * 这种情况下也能够拿到 a 为数字枚举 1
 */
export function qsParseFormatNumberEnum<T>(name: string) {
  const paseInfo = qs.parse(window.location.search);
  const param = paseInfo[name] as string;
  if (checkStrIsEmpty(param)) return undefined;
  const toNumber = Number(param) as T;
  return isNaN(toNumber as any) ? undefined : toNumber;
}

/**
 * 从 url 中获取 query 部分参数
 * 1. 支持类型转换
 * 2. 内置判空逻辑
 * const { paramName1, paramName2 } = qsParseAssertString(['paramName1', 'paramName2']);
 */
export function qsParseAssertString<T extends string>(paramNames: T[]): { [key in T]: string | undefined } {
  const paseInfo = qs.parse(window.location.search);
  const formatedParseInfo = {} as any;
  paramNames.forEach((paramName) => {
    const param = paseInfo[paramName] as string;
    formatedParseInfo[paramName] = checkStrIsEmpty(param) ? undefined : param;
  });
  return formatedParseInfo;
}
