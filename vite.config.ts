import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import postcssPx2viewport from 'postcss-px-to-viewport';
import { vitePluginVersionMark } from 'vite-plugin-version-mark';
import { resolve } from 'path';
import dayjs from 'dayjs';
import { vitePluginGnirts } from './vitePluginGnirts';
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator';
// https://vitejs.dev/config/

// 混淆配置（根据需求选择级别）
const obfuscationConfig = {
  // 轻度混淆配置（示例）
  compact: true,
  identifierNamesGenerator: 'hexadecimal', // 变量名转为十六进制
  stringArray: true, // 加密字符串
  stringArrayThreshold: 0.5, // 加密字符串比例
  // stringArrayEncoding: ['rc4'], // 字符串加密算法

  // 禁用高开销选项（保持性能）
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,

  // 强制转换的字符串
  // forceTransformStrings: ['sm\d+'], // prettier-ignore
  // transformObjectKeys: true, // 强制转换对象键名（即使字符串也混淆）
  // renameProperties: true, // 强制重命名对象属性

  // deadCodeInjection: true, // 注入无效代码
  // deadCodeInjectionThreshold: 0.4, // 无效代码比例
  // debugProtection: true, // 禁用开发者工具调试
};

// const isObfuscate = import.meta.env.MODE!= 'development';
const isObfuscate = true;

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [VantResolver()] }),
    vitePluginVersionMark({
      version: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      outputFile: (version) => ({
        path: 'version.json',
        content: `{"version":"${version}"}`,
      }),
    }),
    vitePluginGnirts(),
    vitePluginBundleObfuscator({
      ...{
        enable: isObfuscate,
        autoExcludeNodeModules: true,
      },
      ...obfuscationConfig,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssPx2viewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 375, // UI设计稿的宽度
          unitPrecision: 5, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          landscape: false, // 是否处理横屏情况
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5716,
  },
});
