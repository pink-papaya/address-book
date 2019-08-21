import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ModalsState } from '@/store/modals/types';
import router from '@/router';

const contactsHistoryKey = 'contacts-modal-state';
const groupsHistoryKey = 'groups-modal-state';

export default {
  showCreateContactModal({ commit, dispatch }) {
    commit('setIsCreateContactModalOpen', true);
    window.history.replaceState(
      { ...(history.state || {}), historyKey: contactsHistoryKey },
      document.title,
    );
    window.history.pushState({}, document.title);
  },
  hideCreateContactModal({ state, commit }) {
    commit('setIsCreateContactModalOpen', false);
    router.go(-1);
  },

  showCreateGroupModal({ commit, dispatch }) {
    commit('setIsCreateGroupModalOpen', true);
    window.history.replaceState(
      { ...(history.state || {}), historyKey: groupsHistoryKey },
      document.title,
    );
    window.history.pushState({}, document.title);
  },
  hideCreateGroupModal({ state, commit }) {
    commit('setIsCreateGroupModalOpen', false);
    router.go(-1);
  },

  init: {
    root: true,
    handler({ state, commit }) {
      window.addEventListener('popstate', event => {
        const mutationMap = {
          [contactsHistoryKey]: 'setIsCreateContactModalOpen',
          [groupsHistoryKey]: 'setIsCreateGroupModalOpen',
        };

        if (
          event.state &&
          mutationMap[event.state.historyKey as keyof typeof mutationMap]
        ) {
          commit(
            mutationMap[event.state.historyKey as keyof typeof mutationMap],
            false,
          );
        }
      });
    },
  },
} as ActionTree<ModalsState, RootState>;
