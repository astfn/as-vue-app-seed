import { createApp } from 'vue';
import App from './App.vue';
import registerAppPlugins from './registerAppPlugins';
/**
 * style
 */
import './global.less';
// vant cpn style
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

const app = createApp(App);
app.use(registerAppPlugins);
app.mount('#app');
