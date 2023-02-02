import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import * as ElIconModules from '@element-plus/icons-vue';
import lazyPlugin from 'vue3-lazy';

import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import './permission';
import './assets/tailwind.css';

const app = createApp(App);
for (let iconName in ElIconModules) {
  app.component(iconName, ElIconModules[iconName]);
}
app.use(router);
app.use(store);
app.use(lazyPlugin, {
  //   loading: require('./assets/loading.gif'), // 加载时默认图片
  //   error: require('./assets/loading.gif'), // 图片失败时默认图片
});
app.mount('#app');
