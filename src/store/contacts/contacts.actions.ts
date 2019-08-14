import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ContactsState } from '@/store/contacts/types';

export default {
  add({ commit }, contact) {
    commit('addContact', contact);
  },
} as ActionTree<ContactsState, RootState>;
