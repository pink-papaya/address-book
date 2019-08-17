import { MutationTree } from 'vuex';
import { AddressBookSession, AuthState } from '@/store/auth/types';

export default {
  setSession: (state, value: AddressBookSession) => (state.addressBook = value),
} as MutationTree<AuthState>;
