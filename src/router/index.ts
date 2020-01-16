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
      path: '/scene2/:id',
      component: () => import('../views/scene-detail2'),
    },
    {
      name: 'view-test-detail',
      path: '/test',
      component: () => import('../views/test-page'),
    },
    {
      name: 'view-scene-detail',
      path: '/scene/:id',
      component: () => import('../views/scene-detail'),
    },
  ],
});
