import BrowserLogger from 'alife-logger';
import { getCurrentVersionInMeta } from './version-diff';

let __bl;
if (import.meta.env.MODE === 'prod') {
  __bl = BrowserLogger.singleton({
    // 根据应用配置
    pid: '',
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
