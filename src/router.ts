import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "main-app" */ '@/views/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: {
        requiresAuthless: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () =>
        import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue'),
      meta: {
        requiresAuthless: true,
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(route => route.meta.requiresAuth) &&
    !store.getters['auth/isUserLoggedIn']
  ) {
    return next('/login');
  }

  if (
    to.matched.some(route => route.meta.requiresAuthless) &&
    store.getters['auth/isUserLoggedIn']
  ) {
    return next('/');
  }

  next();
});

export default router;
