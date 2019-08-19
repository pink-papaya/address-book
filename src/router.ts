import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Home from '@/views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () =>
        import(
          /* webpackChunkName: "main-app" */ '@/components/layouts/AppLayout.vue'
        ),
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
      ],
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
    const path = !store.getters['auth/isUserLoggedIn']
      ? '/login'
      : '/check-login';

    return next(`${path}?redirectUrl=${to.path}`);
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
