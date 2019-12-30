import Vue from 'vue';
// import App from './app.vue';
import App from './app/index';

new Vue({
  el: '#vue-app',
  data: {
    shared: false,
  },
  render: h => h(App),
});
