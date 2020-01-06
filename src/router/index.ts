import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  base: '',
  mode: 'history',
  routes: [
    {
      name: 'view-index',
      path: '/',
      component: () => import('../views/index'),
    },
  ],
});
