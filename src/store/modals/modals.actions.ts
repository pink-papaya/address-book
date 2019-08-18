import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ModalsState } from '@/store/modals/types';

export default {
  showCreateContactModal({ state, commit }) {
    commit('setIsCreateContactModalOpen', true);
  },
  hideCreateContactModal({ state, commit }) {
    commit('setIsCreateContactModalOpen', false);
  },
} as ActionTree<ModalsState, RootState>;
