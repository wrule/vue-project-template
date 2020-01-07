import Vue from 'vue';
import App from './app/index';
import '@/student/';

new Vue({
  el: '#vue-app',
  render: (h) => h(App),
});
