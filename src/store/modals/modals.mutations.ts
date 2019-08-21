import { MutationTree } from 'vuex';
import { ModalsState } from '@/store/modals/types';

export default {
  setIsCreateContactModalOpen(state, value) {
    state.isCreateContactModalOpen = value;
  },
  setIsCreateGroupModalOpen(state, value) {
    state.isCreateGroupModalOpen = value;
  },
} as MutationTree<ModalsState>;
