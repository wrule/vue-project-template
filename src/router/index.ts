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
      name: 'view-qq',
      path: '/qq/:id',
      component: () => import('@/views/qq'),
    },
    {
      name: 'view-group',
      path: '/group/:id',
      component: () => import('@/views/group'),
    },
  ],
});
