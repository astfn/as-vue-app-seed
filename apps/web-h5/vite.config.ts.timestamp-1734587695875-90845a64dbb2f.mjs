// vite.config.ts
import { defineConfig } from 'file:///D:/02-my/my-github-projects/as-vue-app-seed/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.2_less@4.2.1/node_modules/vite/dist/node/index.js';
import vue from 'file:///D:/02-my/my-github-projects/as-vue-app-seed/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.11_@types+node@22.10.2_less@4.2.1__vue@3.5.13_typescript@5.7.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs';
import Components from 'file:///D:/02-my/my-github-projects/as-vue-app-seed/node_modules/.pnpm/unplugin-vue-components@0.27.5_@babel+parser@7.26.3_@nuxt+kit@3.14.1592_rollup@4.28.1__rollup_mlom6eqaaddzhel5u6zqbdgale/node_modules/unplugin-vue-components/dist/vite.js';
import { VantResolver } from 'file:///D:/02-my/my-github-projects/as-vue-app-seed/node_modules/.pnpm/@vant+auto-import-resolver@1.2.1/node_modules/@vant/auto-import-resolver/dist/index.esm.mjs';
import postcssPx2viewport from 'file:///D:/02-my/my-github-projects/as-vue-app-seed/node_modules/.pnpm/postcss-px-to-viewport@1.1.1/node_modules/postcss-px-to-viewport/index.js';
import { vitePluginVersionMark } from 'file:///D:/02-my/my-github-projects/as-vue-app-seed/node_modules/.pnpm/vite-plugin-version-mark@0.1.4_vite@5.4.11_@types+node@22.10.2_less@4.2.1_/node_modules/vite-plugin-version-mark/dist/vite/index.js';
import { resolve } from 'path';
import dayjs from 'file:///D:/02-my/my-github-projects/as-vue-app-seed/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js';
var __vite_injected_original_dirname = 'D:\\02-my\\my-github-projects\\as-vue-app-seed\\apps\\web-h5';
var vite_config_default = defineConfig({
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
  ],
  css: {
    postcss: {
      plugins: [
        postcssPx2viewport({
          unitToConvert: 'px',
          // 要转化的单位
          viewportWidth: 375,
          // UI设计稿的宽度
          unitPrecision: 5,
          // 转换后的精度，即小数点位数
          propList: ['*'],
          // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw',
          // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw',
          // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'],
          // 指定不转换为视窗单位的类名，
          minPixelValue: 1,
          // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true,
          // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true,
          // 是否转换后直接更换属性值
          exclude: [/node_modules/],
          // 设置忽略文件，用正则做目录名匹配
          landscape: false,
          // 是否处理横屏情况
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__vite_injected_original_dirname, 'src'),
    },
  },
  server: {
    port: 5716,
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwwMi1teVxcXFxteS1naXRodWItcHJvamVjdHNcXFxcYXMtdnVlLWFwcC1zZWVkXFxcXGFwcHNcXFxcd2ViLWg1XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwwMi1teVxcXFxteS1naXRodWItcHJvamVjdHNcXFxcYXMtdnVlLWFwcC1zZWVkXFxcXGFwcHNcXFxcd2ViLWg1XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8wMi1teS9teS1naXRodWItcHJvamVjdHMvYXMtdnVlLWFwcC1zZWVkL2FwcHMvd2ViLWg1L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ0B2YW50L2F1dG8taW1wb3J0LXJlc29sdmVyJztcclxuaW1wb3J0IHBvc3Rjc3NQeDJ2aWV3cG9ydCBmcm9tICdwb3N0Y3NzLXB4LXRvLXZpZXdwb3J0JztcclxuaW1wb3J0IHsgdml0ZVBsdWdpblZlcnNpb25NYXJrIH0gZnJvbSAndml0ZS1wbHVnaW4tdmVyc2lvbi1tYXJrJztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIENvbXBvbmVudHMoeyByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV0gfSksXHJcbiAgICB2aXRlUGx1Z2luVmVyc2lvbk1hcmsoe1xyXG4gICAgICB2ZXJzaW9uOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICBvdXRwdXRGaWxlOiAodmVyc2lvbikgPT4gKHtcclxuICAgICAgICBwYXRoOiAndmVyc2lvbi5qc29uJyxcclxuICAgICAgICBjb250ZW50OiBge1widmVyc2lvblwiOlwiJHt2ZXJzaW9ufVwifWAsXHJcbiAgICAgIH0pLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBjc3M6IHtcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIHBvc3Rjc3NQeDJ2aWV3cG9ydCh7XHJcbiAgICAgICAgICB1bml0VG9Db252ZXJ0OiAncHgnLCAvLyBcdTg5ODFcdThGNkNcdTUzMTZcdTc2ODRcdTUzNTVcdTRGNERcclxuICAgICAgICAgIHZpZXdwb3J0V2lkdGg6IDM3NSwgLy8gVUlcdThCQkVcdThCQTFcdTdBM0ZcdTc2ODRcdTVCQkRcdTVFQTZcclxuICAgICAgICAgIHVuaXRQcmVjaXNpb246IDUsIC8vIFx1OEY2Q1x1NjM2Mlx1NTQwRVx1NzY4NFx1N0NCRVx1NUVBNlx1RkYwQ1x1NTM3M1x1NUMwRlx1NjU3MFx1NzBCOVx1NEY0RFx1NjU3MFxyXG4gICAgICAgICAgcHJvcExpc3Q6IFsnKiddLCAvLyBcdTYzMDdcdTVCOUFcdThGNkNcdTYzNjJcdTc2ODRjc3NcdTVDNUVcdTYwMjdcdTc2ODRcdTUzNTVcdTRGNERcdUZGMEMqXHU0RUUzXHU4ODY4XHU1MTY4XHU5MEU4Y3NzXHU1QzVFXHU2MDI3XHU3Njg0XHU1MzU1XHU0RjREXHU5MEZEXHU4RkRCXHU4ODRDXHU4RjZDXHU2MzYyXHJcbiAgICAgICAgICB2aWV3cG9ydFVuaXQ6ICd2dycsIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1OEY2Q1x1NjM2Mlx1NjIxMFx1NzY4NFx1ODlDNlx1N0E5N1x1NTM1NVx1NEY0RFx1RkYwQ1x1OUVEOFx1OEJBNHZ3XHJcbiAgICAgICAgICBmb250Vmlld3BvcnRVbml0OiAndncnLCAvLyBcdTYzMDdcdTVCOUFcdTVCNTdcdTRGNTNcdTk3MDBcdTg5ODFcdThGNkNcdTYzNjJcdTYyMTBcdTc2ODRcdTg5QzZcdTdBOTdcdTUzNTVcdTRGNERcdUZGMENcdTlFRDhcdThCQTR2d1xyXG4gICAgICAgICAgc2VsZWN0b3JCbGFja0xpc3Q6IFsnaWdub3JlLSddLCAvLyBcdTYzMDdcdTVCOUFcdTRFMERcdThGNkNcdTYzNjJcdTRFM0FcdTg5QzZcdTdBOTdcdTUzNTVcdTRGNERcdTc2ODRcdTdDN0JcdTU0MERcdUZGMENcclxuICAgICAgICAgIG1pblBpeGVsVmFsdWU6IDEsIC8vIFx1OUVEOFx1OEJBNFx1NTAzQzFcdUZGMENcdTVDMEZcdTRFOEVcdTYyMTZcdTdCNDlcdTRFOEUxcHhcdTUyMTlcdTRFMERcdThGREJcdTg4NENcdThGNkNcdTYzNjJcclxuICAgICAgICAgIG1lZGlhUXVlcnk6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NTcyOFx1NUE5Mlx1NEY1M1x1NjdFNVx1OEJFMlx1NzY4NGNzc1x1NEVFM1x1NzgwMVx1NEUyRFx1NEU1Rlx1OEZEQlx1ODg0Q1x1OEY2Q1x1NjM2Mlx1RkYwQ1x1OUVEOFx1OEJBNGZhbHNlXHJcbiAgICAgICAgICByZXBsYWNlOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdThGNkNcdTYzNjJcdTU0MEVcdTc2RjRcdTYzQTVcdTY2RjRcdTYzNjJcdTVDNUVcdTYwMjdcdTUwM0NcclxuICAgICAgICAgIGV4Y2x1ZGU6IFsvbm9kZV9tb2R1bGVzL10sIC8vIFx1OEJCRVx1N0Y2RVx1NUZGRFx1NzU2NVx1NjU4N1x1NEVGNlx1RkYwQ1x1NzUyOFx1NkI2M1x1NTIxOVx1NTA1QVx1NzZFRVx1NUY1NVx1NTQwRFx1NTMzOVx1OTE0RFxyXG4gICAgICAgICAgbGFuZHNjYXBlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU1OTA0XHU3NDA2XHU2QTJBXHU1QzRGXHU2MEM1XHU1MUI1XHJcbiAgICAgICAgfSksXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogNTcxNixcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVyxTQUFTLG9CQUFvQjtBQUNoWSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyx3QkFBd0I7QUFDL0IsU0FBUyw2QkFBNkI7QUFDdEMsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sV0FBVztBQVBsQixJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7QUFBQSxJQUMxQyxzQkFBc0I7QUFBQSxNQUNwQixTQUFTLE1BQU0sRUFBRSxPQUFPLHFCQUFxQjtBQUFBLE1BQzdDLFlBQVksQ0FBQyxhQUFhO0FBQUEsUUFDeEIsTUFBTTtBQUFBLFFBQ04sU0FBUyxlQUFlLE9BQU87QUFBQSxNQUNqQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQLG1CQUFtQjtBQUFBLFVBQ2pCLGVBQWU7QUFBQTtBQUFBLFVBQ2YsZUFBZTtBQUFBO0FBQUEsVUFDZixlQUFlO0FBQUE7QUFBQSxVQUNmLFVBQVUsQ0FBQyxHQUFHO0FBQUE7QUFBQSxVQUNkLGNBQWM7QUFBQTtBQUFBLFVBQ2Qsa0JBQWtCO0FBQUE7QUFBQSxVQUNsQixtQkFBbUIsQ0FBQyxTQUFTO0FBQUE7QUFBQSxVQUM3QixlQUFlO0FBQUE7QUFBQSxVQUNmLFlBQVk7QUFBQTtBQUFBLFVBQ1osU0FBUztBQUFBO0FBQUEsVUFDVCxTQUFTLENBQUMsY0FBYztBQUFBO0FBQUEsVUFDeEIsV0FBVztBQUFBO0FBQUEsUUFDYixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
