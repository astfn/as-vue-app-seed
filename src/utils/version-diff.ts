// 检测间隔，10 min

import { showDialog } from 'vant';

const versionDateRegexp = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export function getCurrentVersionInMeta() {
  const vitePluginVersionMarkMetaContent = (document.querySelector('meta[name="application-name"]') as any)
    ?.content as string;
  const version = vitePluginVersionMarkMetaContent?.match?.(versionDateRegexp)?.[0];
  if (!version) {
    console.error(
      'getCurrentVersionInMeta: 获取 version 失败',
      version,
      vitePluginVersionMarkMetaContent,
      vitePluginVersionMarkMetaContent?.match?.(versionDateRegexp)
    );
  }
  return version;
}

const Time = 1000 * 60 * 10;
// const Time = 1000;

// 发布版本检测
export const versionDiff = async () => {
  if (import.meta.env.MODE == 'development') return;
  fetch('/version.json?timestamp=' + new Date().getTime())
    .then((res) => res.json())
    .then((data) => {
      const { version } = data;
      const htmlVersion = getCurrentVersionInMeta();
      console.log('😊', htmlVersion, version);
      if (version && htmlVersion && String(version) !== String(htmlVersion)) {
        showDialog({
          title: '检测到新版本，请确认',
        }).then(() => {
          window.location.reload();
        });
      } else {
        setTimeout(() => {
          versionDiff();
        }, Time);
      }
    })
    .catch((err) => console.log('versionDiff 逻辑执行失败', err));
};

export const versionCheckLoop = () => {
  setTimeout(() => {
    versionDiff();
  }, Time);
};
