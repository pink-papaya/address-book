import { MutationTree } from 'vuex';
import { ModalsState } from '@/store/modals/types';

export default {
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
} as MutationTree<ModalsState>;
