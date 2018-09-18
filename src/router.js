import Vue from 'vue';
import Router from 'vue-router';
import LoginRegister from './views/LoginRegister.vue';
import Dashboard from './views/Dashboard.vue';
import MyEvents from './components/MyEvents.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginRegister,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: 'myEvents',
          name: 'myEvents',
          component: MyEvents,
        },
        {
          path: 'allEvents',
          name: 'allEvents',
          component: () => import(/* webpackChunkName: "allEvents" */ './components/AllEvents.vue'),
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: () =>
            import(/* webpackChunkName: "notifications" */ './components/Notifications.vue'),
        },
      ],
    },
  ],
});
