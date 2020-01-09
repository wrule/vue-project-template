import Vue from 'vue';
import App from './app/index';
import router from '@/router';
import ':/iconfont/iconfont.css';

new Vue({
  el: '#vue-app',
  router,
  render: (h) => h(App),
});
