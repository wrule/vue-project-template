import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'view-index',
      path: '/',
      component: () => import('../views/index'),
    },
    {
      name: 'view-scene-detail',
      path: '/scene/:id',
      component: () => import('../views/scene-detail'),
    },
  ],
});
