import gnirts from 'gnirts';
import fs from 'fs';
import { resolve } from 'path';
import { PluginOption } from 'vite';

/**
 * 默认只处理 src 目录下的文件
 */
export type TMatchFile = (p: { filePath: string }) => boolean;
export type TVitePluginGnirtsOptions = {
  customMatchFile?: TMatchFile;
  matchFileReg?: RegExp;
};

const matchFileDefaultReg: Required<TVitePluginGnirtsOptions>['matchFileReg'] = /\.(js|tsx?|cjs|mjs)$/;
const matchFileDefaultMethod = (
  p: Parameters<Required<TVitePluginGnirtsOptions>['customMatchFile']>[0] &
    Pick<Required<TVitePluginGnirtsOptions>, 'matchFileReg'>
) => {
  const { filePath, matchFileReg } = p;
  const srcDir = resolve(__dirname, './src').replace(/\\/g, '/');
  return filePath.includes(srcDir) && matchFileReg.test(filePath);
};

export function vitePluginGnirts(p?: TVitePluginGnirtsOptions): PluginOption {
  const { customMatchFile, matchFileReg = matchFileDefaultReg } = p ?? {};

  const matchFile = (p: Parameters<TMatchFile>[0]) => {
    if (customMatchFile && typeof customMatchFile === 'function') {
      return customMatchFile(p);
    } else {
      return matchFileDefaultMethod({ ...p, matchFileReg });
    }
  };

  return {
    name: 'vite-plugin-gnirts',
    enforce: 'post',
    apply: 'build',
    load(filePath) {
      if (typeof matchFile !== 'function') {
        console.warn('vite-plugin-gnirts: matchFile is not function');
        return;
      }
      if (matchFile({ filePath })) {
        try {
          const source = fs.readFileSync(filePath, 'utf-8');
          // 匹配 /* @mangle */ 到 /* @/mangle */ 之间的所有内容（跨行匹配）
          const regex = /\/\* @mangle \*\/[\s\S]*?\/\* \/@mangle \*\//g;
          const result = source?.replace?.(regex, (matched) => {
            // 提取中间内容（去掉注释部分）
            const content = matched.replace(/\/\* @mangle \*\/\s*/, '').replace(/\s*\/\* \/@mangle \*\//, '');
            const transfered = gnirts.getCode(content);
            // console.log('🚀 transfered', matched, transfered);
            return transfered;
          });
          return result;
        } catch (e) {
          console.warn(`vite-plugin-gnirts: [gnirts] Failed to encode block:`, e);
          return null;
        }
      }
      return null; // 其他文件交给其他插件处理
    },

    /**
     * 调试: 查看 load 的处理结果
     */
    // transform(src, filePath) {
    //   if (typeof matchFile !== 'function') {
    //     console.warn('matchFile is not function');
    //     return;
    //   }
    //   // const targetSrc = sourceMap.get(id);
    //   if (matchFile({ filePath })) {
    //     if (filePath.includes('format')) {
    //       console.log('🚀 transform func', src);
    //     }
    //     return {
    //       code: src,
    //       map: null, // 如果你需要 sourceMap 支持，可以生成
    //     };
    //   }
    //   return;
    // },
  };
}
