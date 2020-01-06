import Vue from 'vue';
// import App from './app.vue';
import App from './app/index';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/iconfont/iconfont.css';

Vue.use(ElementUI, {
  size: 'mini',
  zIndex: 3000,
})

new Vue({
  el: '#vue-app',
  router,
  render: (h) => h(App),
});
