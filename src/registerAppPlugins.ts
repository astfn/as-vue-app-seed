import VConsole from 'vconsole';
import { App } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

function registerPinia(app: App) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
}

export default {
  install(app: App<Element>) {
    // if (import.meta.env.MODE === 'development') {
    new VConsole();
    // }
    registerPinia(app);
    app.use(router);
  },
};
