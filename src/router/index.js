import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/layout';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home')
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/card',
          name: 'Card',
          meta: {
            title: '刮刮卡'
          },
          component: () => import('@/views/card/index')
        },
        {
          path: '/wheel',
          name: 'Wheel',
          meta: {
            title: '幸运大转盘'
          },
          component: () => import('@/views/wheel/index')
        }
      ]
    }
  ]
});
