import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'view-baselines-compare',
      path: '/baselines/compare/:session',
      component: () => import('../views/baselines-compare'),
    },
    {
      name: 'view-scene-detail',
      path: '/scene/:id',
      component: () => import('../views/scene-detail'),
    },
  ],
});
