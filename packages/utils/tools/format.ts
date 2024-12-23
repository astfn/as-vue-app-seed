import { isNullOrUndefined } from './validate';

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
    throw new Error('字符串长度不足以进行加密展示');
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
