import { useWrapperRef } from '@vmono/vhooks';

/**
 * 记录页面地址，用于登录成功后跳转
 * 记录时机:
 *  1. token过期时调用接口，401错误，记录当前所在页面地址
 *  2. 在进行页面跳转时，不存在 token，则记录跳转到登陆过期拦截页面之前的页面地址
 */
export function useLoginedJump2Url() {
  const [loginedJump2Url, updateLoginedJump2Url] = useWrapperRef<string | undefined>(undefined);

  const setLoginedJump2Url = (newValue: string) => {
    updateLoginedJump2Url(newValue);
  };

  const removeLoginedJump2Url = () => {
    updateLoginedJump2Url(undefined);
  };
  return { loginedJump2Url, setLoginedJump2Url, removeLoginedJump2Url };
}
