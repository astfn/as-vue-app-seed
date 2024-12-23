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

// 发布版本检测
export type TVersionDiffPresets = {
  versionUpdatePromptTrigger: () => Promise<any>;
  checkTimeGap?: number;
};
async function versionDiff(presets: TVersionDiffPresets) {
  const { versionUpdatePromptTrigger, checkTimeGap = 1000 * 60 * 10 } = presets;
  if (import.meta.env.MODE == 'development') return;
  fetch('/version.json?timestamp=' + new Date().getTime())
    .then((res) => res.json())
    .then((data) => {
      const { version } = data;
      const inMetaVersion = getCurrentVersionInMeta();
      console.log(`🔎--check version--🔍 inMetaVersion: ${inMetaVersion} ; inJsonVersion: ${version}`); // eslint-disable-line no-console
      if (version && inMetaVersion && String(version) !== String(inMetaVersion)) {
        versionUpdatePromptTrigger().then(() => {
          window.location.reload();
        });
      } else {
        setTimeout(() => {
          versionDiff(presets);
        }, checkTimeGap);
      }
    })
    .catch((err) => console.error('versionDiff 逻辑执行失败', err));
}

export const versionCheckLoop = (presets: TVersionDiffPresets) => {
  setTimeout(() => {
    versionDiff(presets);
  }, presets.checkTimeGap);
};
