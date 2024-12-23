import VConsole from 'vconsole';
import { App } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { versionCheckLoop } from '@as-vue-app-seed/utils';
import { showDialog } from 'vant';

function registerPinia(app: App) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
}

export default {
  install(app: App<Element>) {
    versionCheckLoop({
      versionUpdatePromptTrigger: () =>
        showDialog({
          title: '检测到新版本，请确认',
        }),
    });
    if (import.meta.env.MODE === 'development') {
      new VConsole();
    }
    registerPinia(app);
    app.use(router);
  },
};
