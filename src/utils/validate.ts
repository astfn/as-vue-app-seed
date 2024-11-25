export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export const PhoneRule = {
  pattern: /^1[3-9]\d{9}$/,
  message: '请输入正确的手机号',
};

export const IdRule = {
  pattern:
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
  message: '请输入正确的身份证号码',
};
