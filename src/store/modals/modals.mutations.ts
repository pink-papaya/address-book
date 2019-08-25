import { MutationTree } from 'vuex';
import { ModalsState } from '@/store/modals/types';
import { Contact } from '@/store/contacts/types';

const mutations: MutationTree<ModalsState> = {
  setIsContactModalOpen(state, value: boolean) {
    state.isContactModalOpen = value;
  },

  setIsViewContactModalOpen(state, value: boolean) {
    state.isViewContactModalOpen = value;
  },
  setContactModalModelId(state, value: Contact['id']) {
    state.contactModalModelId = value;
  },

  setIsGroupModalOpen(state, value: boolean) {
    state.isGroupModalOpen = value;
  },

  setIsChangePasswordModal(state, value: boolean) {
    state.isChangePasswordModalOpen = value;
  },
};

export default mutations;
