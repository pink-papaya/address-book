import { MutationTree } from 'vuex';
import { ContactsFormState } from '@/store/contacts/form/types';

const mutations: MutationTree<ContactsFormState> = {
  setGroupId(state, value: string) {
    state.groupId = value;
  },
  setName(state, value: string) {
    state.name = value;
  },
  setPhone(state, value: string) {
    state.phone = value;
  },
  setPictureUrl(state, value: string) {
    state.pictureUrl = value;
  },
};

export default mutations;
