import { MutationTree } from 'vuex';
import { ModalsState } from '@/store/modals/types';

export default {
  setIsCreateContactModalOpen(state, value) {
    state.isCreateContactModalOpen = value;
  },
} as MutationTree<ModalsState>;
