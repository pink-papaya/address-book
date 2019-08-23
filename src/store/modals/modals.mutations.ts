import { MutationTree } from 'vuex';
import { ModalsState } from '@/store/modals/types';

const mutations: MutationTree<ModalsState> = {
  setIsCreateContactModalOpen(state, value) {
    state.isCreateContactModalOpen = value;
  },
  setIsViewContactModalOpen(state, value) {
    state.isViewContactModalOpen = value;
  },
  setContactModalMode(state, value) {
    state.contactModalMode = value;
  },
  setContactModalModel(state, value) {
    state.contactModalModel = value;
  },

  setIsCreateGroupModalOpen(state, value) {
    state.isCreateGroupModalOpen = value;
  },
};

export default mutations;
