import Vue from 'vue';
import VueRouter from 'vue-router';
import ViewIndex from '@/views/index';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'view-index',
      path: '/',
      component: ViewIndex,
    },
    {
      name: 'view-check',
      path: '/check/:id',
      component: () => import('@/views/check'),
    },
    {
      name: 'view-query',
      path: '/query/:id',
      component: () => import('@/views/query'),
    },
  ],
});
