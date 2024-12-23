import { App } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { versionCheckLoop } from '@as-vue-app-seed/utils';

function registerPinia(app: App) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
}

export default {
  install(app: App<Element>) {
    versionCheckLoop({
      versionUpdatePromptTrigger: () =>
        new Promise((resolve, reject) => {
          const isConfirm = confirm('检测到新版本，请确认');
          isConfirm ? resolve(true) : reject();
        }),
    });
    registerPinia(app);
    app.use(router);
  },
};
