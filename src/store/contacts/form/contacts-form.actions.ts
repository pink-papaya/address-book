import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ContactsFormState } from '@/store/contacts/form/types';
import { Contact } from '@/store/contacts/types';

const actions: ActionTree<ContactsFormState, RootState> = {
  loadContact({ commit, dispatch }, contact?: Contact) {
    if (!contact) {
      dispatch('clearContact');
      return;
    }

    commit('setId', contact.id);
    commit('setGroupId', contact.groupId);
    commit('setName', contact.name);
    commit('setPhone', contact.phone);
    commit('setPictureUrl', contact.pictureUrl);
  },

  clearContact({ commit }) {
    commit('setId', undefined);
    commit('setGroupId', '');
    commit('setName', '');
    commit('setPhone', '');
    commit('setPictureUrl', '');
  },
};

export default actions;
