import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthState } from '@/store/auth/types';
import router from '@/router';
import addressBookService from '@/services/addressBook.service';

const sessionKey = 'address-book-session';

export default {
  register(context, { username, password }) {
    return addressBookService.create(username, password);
  },

  async login({ commit, dispatch }, { username, password }) {
    const addressBook = await addressBookService.login(username, password);

    const session = {
      id: addressBook.id,
      username: addressBook.username,
    };

    commit('setSession', session);

    localStorage.setItem(sessionKey, JSON.stringify(session));
    dispatch('contacts/storeContacts', addressBook.contacts, { root: true });
    dispatch('groups/storeGroups', addressBook.groups, { root: true });
  },

  logout({ commit }) {
    commit('setSession', undefined);
    localStorage.removeItem(sessionKey);

    router.push('/login');
  },

  init: {
    root: true,
    handler({ commit }) {
      const session = JSON.parse(localStorage.getItem(sessionKey) || 'null');

      if (session) {
        commit('setSession', session);
      }
    },
  },
} as ActionTree<AuthState, RootState>;
