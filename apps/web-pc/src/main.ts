import { createApp } from 'vue';
import App from './App.vue';
import './globalLogicProcessing';
import registerAppPlugins from './registerAppPlugins';
import './utils/arms';
/**
 * style
 */
import './global.less';

const app = createApp(App);
app.use(registerAppPlugins);
app.mount('#app');
