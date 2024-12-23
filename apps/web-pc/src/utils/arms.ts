// @ts-ignore
import BrowserLogger from 'alife-logger';
import { getCurrentVersionInMeta } from '@as-vue-app-seed/utils';

let __bl: any;
if (import.meta.env.MODE === 'prod') {
  __bl = BrowserLogger.singleton({
    // 根据应用配置
    pid: 'ilu2q@1bbac7135a8177b',
    appType: 'web',
    imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
    sendResource: true,
    enableLinkTrace: true,
    behavior: true,
    release: getCurrentVersionInMeta(),
  });
} else {
  __bl = {};
}

export default __bl;
