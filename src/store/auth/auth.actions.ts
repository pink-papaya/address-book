import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthState } from '@/store/auth/types';
import router from '@/router';
import addressBookService from '@/services/addressBook.service';

const sessionKey = 'address-book-session';

export default {
  register({ commit, dispatch }, { username, password }) {
    return addressBookService.create(username, password);
  },

  async login({ commit, dispatch }, { username, password }) {
    const addressBook = await addressBookService.login(username, password);

    commit('setUser', addressBook.id);

    localStorage.setItem(sessionKey, addressBook.id);
    dispatch('contacts/storeContacts', addressBook.contacts, { root: true });
    dispatch('groups/storeGroups', addressBook.groups, { root: true });
  },

  logout({ commit }) {
    commit('setUser', null);
    localStorage.removeItem(sessionKey);

    router.push('/login');
  },
} as ActionTree<AuthState, RootState>;
