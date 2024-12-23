import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { vitePluginVersionMark } from 'vite-plugin-version-mark';
import { resolve } from 'path';
import dayjs from 'dayjs';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [] }),
    vitePluginVersionMark({
      version: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      outputFile: (version) => ({
        path: 'version.json',
        content: `{"version":"${version}"}`,
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5726,
  },
});
