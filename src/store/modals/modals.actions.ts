import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ModalsState } from '@/store/modals/types';
import router from '@/router';
import { Contact } from '@/store/contacts/types';

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

export default {
  showCreateContactModal({ commit }, contact?: Contact) {
    commit('setIsCreateContactModalOpen', true);
    commit('setContactModalModel', contact);

    storeHistoryKey(editContactHistoryKey);
  },
  hideCreateContactModal({ commit }) {
    commit('setIsCreateContactModalOpen', false);
    router.go(-1);
  },

  showViewContactModal({ commit }, contact?: Contact) {
    commit('setIsViewContactModalOpen', true);
    commit('setContactModalModel', contact);

    storeHistoryKey(editContactHistoryKey);
  },
  hideViewContactModal({ commit }) {
    commit('setIsViewContactModalOpen', false);
    router.go(-1);
  },

  showCreateGroupModal({ commit }) {
    commit('setIsCreateGroupModalOpen', true);

    storeHistoryKey(editGroupHistoryKey);
  },
  hideCreateGroupModal({ commit }) {
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
} as ActionTree<ModalsState, RootState>;
