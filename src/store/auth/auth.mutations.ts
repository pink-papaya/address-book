import { MutationTree } from 'vuex';
import { AddressBookSession, AuthState } from '@/store/auth/types';

const mutations: MutationTree<AuthState> = {
  setSession(state, value: undefined | AddressBookSession) {
    state.addressBook = value;
  },
};

export default mutations;
