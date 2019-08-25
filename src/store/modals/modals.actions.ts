import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ModalsState } from '@/store/modals/types';
import router from '@/router';
import { Contact } from '@/store/contacts/types';
import { Group } from '@/store/groups/types';

const editContactHistoryKey = 'contact-modal-state';
const viewContactsHistoryKey = 'view-contact-modal-state';
const editGroupHistoryKey = 'group-modal-state';

const storeHistoryKey = (historyKey: string) => {
  window.history.replaceState(
    { ...(history.state || {}), historyKey },
    document.title,
  );
  window.history.pushState({}, document.title);
};

const actions: ActionTree<ModalsState, RootState> = {
  showContactModal({ commit, dispatch }, contact?: Contact) {
    commit('setIsCreateContactModalOpen', true);
    dispatch('contacts/form/loadContact', contact, { root: true });

    storeHistoryKey(editContactHistoryKey);
  },
  hideContactModal({ commit }) {
    // mutation will be called twice
    // once here and another in the popstate handler
    // @todo confirm if this commit is necessary here
    commit('setIsCreateContactModalOpen', false);
    router.go(-1);
  },

  showViewContactModal({ commit }, contact?: Contact) {
    commit('setIsViewContactModalOpen', true);

    if (contact) {
      commit('setContactModalModelId', contact.id);
    }

    storeHistoryKey(viewContactsHistoryKey);
  },
  hideViewContactModal({ commit }) {
    commit('setIsViewContactModalOpen', false);
    router.go(-1);
  },

  showGroupModal({ commit, dispatch }, group?: Group) {
    commit('setIsCreateGroupModalOpen', true);
    dispatch('groups/form/loadGroup', group, { root: true });

    storeHistoryKey(editGroupHistoryKey);
  },
  hideGroupModal({ commit }) {
    commit('setIsCreateGroupModalOpen', false);
    router.go(-1);
  },

  init: {
    root: true,
    handler({ commit }) {
      window.addEventListener('popstate', event => {
        const mutationMap = {
          [editContactHistoryKey]: 'setIsCreateContactModalOpen',
          [viewContactsHistoryKey]: 'setIsViewContactModalOpen',
          [editGroupHistoryKey]: 'setIsCreateGroupModalOpen',
        };

        const key: keyof typeof mutationMap = event.state.historyKey;

        if (event.state && mutationMap[key]) {
          commit(mutationMap[key], false);
        }
      });
    },
  },
};

export default actions;
