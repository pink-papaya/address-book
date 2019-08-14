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
        {
          path: '/about',
          name: 'about',
          component: () =>
            import(/* webpackChunkName: "about" */ '@/views/About.vue'),
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
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue'),
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

  next();
});

export default router;
