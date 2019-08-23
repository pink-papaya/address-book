import { MutationTree } from 'vuex';
import { ModalsState } from '@/store/modals/types';
import { Contact } from '@/store/contacts/types';

const mutations: MutationTree<ModalsState> = {
  setIsCreateContactModalOpen(state, value: boolean) {
    state.isCreateContactModalOpen = value;
  },

  setIsViewContactModalOpen(state, value: boolean) {
    state.isViewContactModalOpen = value;
  },
  setContactModalModelId(state, value: Contact['id']) {
    state.contactModalModelId = value;
  },

  setIsCreateGroupModalOpen(state, value: boolean) {
    state.isCreateGroupModalOpen = value;
  },
};

export default mutations;
