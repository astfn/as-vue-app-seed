import { createApp } from 'vue';
import App from './App.vue';
import './utils/arms';
// 全局插件注册
import registerAppPlugins from './registerAppPlugins';
// 全局默认执行的脚本
import './globalLogicProcessing';
// 全局样式文件
import './global.less';
// cpn-kit css
import '@vmono/vant-kit/style.css';
// vant css
import 'vant/lib/index.css';

const app = createApp(App);
app.use(registerAppPlugins);
app.mount('#app');
