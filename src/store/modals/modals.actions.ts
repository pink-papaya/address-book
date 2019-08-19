import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ModalsState } from '@/store/modals/types';
import router from '@/router';

const contactsHistoryKey = 'contacts-model-state';

export default {
  showCreateContactModal({ commit, dispatch }) {
    commit('setIsCreateContactModalOpen', true);
    window.history.replaceState(
      { ...(history.state || {}), historyKey: contactsHistoryKey },
      'key',
    );
    window.history.pushState({}, 'key2');
  },
  hideCreateContactModal({ state, commit }) {
    commit('setIsCreateContactModalOpen', false);
    router.go(-1);
  },

  init: {
    root: true,
    handler({ state, commit }) {
      window.addEventListener('popstate', event => {
        const mutationMap = {
          contactsHistoryKey: 'setIsCreateContactModalOpen',
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
