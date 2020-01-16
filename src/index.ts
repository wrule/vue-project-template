import Vue from 'vue';
import App from './app/index';
import router from '@/router';
import ':/iconfont/iconfont.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, {
  size: 'mini',
});

new Vue({
  el: '#vue-app',
  router,
  render: (h) => h(App),
});
