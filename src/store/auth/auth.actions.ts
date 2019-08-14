import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthState } from '@/store/auth/types';
import router from '@/router';
import addressBookService from '@/services/addressBook.service';

export default {
  register({ commit, dispatch }, { username, password }) {
    return addressBookService.create(username, password);
  },

  async login({ commit, dispatch }, { username, password }) {
    const addressBook = await addressBookService.login(username, password);

    commit('setUser', addressBook);
    dispatch('products/getUserProducts', null, { root: true });
  },

  logout({ commit }) {
    commit('setUser', null);
    commit('products/setProducts', null, { root: true });

    const currentRouter = router.app.$route;
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login');
    }
  },
} as ActionTree<AuthState, RootState>;
