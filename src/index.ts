import Vue from 'vue';
import App from './app/index';
import '@/student/';
import ':/iconfont/iconfont.css';

new Vue({
  el: '#vue-app',
  render: (h) => h(App),
});
