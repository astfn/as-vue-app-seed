import VConsole from 'vconsole';
import { App } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { versionCheckLoop } from '@/utils/version-diff';

function registerPinia(app: App) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
}

export default {
  install(app: App<Element>) {
    versionCheckLoop();
    if (import.meta.env.MODE === 'development') {
      new VConsole();
    }
    registerPinia(app);
    app.use(router);
  },
};
