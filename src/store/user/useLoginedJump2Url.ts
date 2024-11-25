import { useWrapperRef } from '@/hooks';

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
