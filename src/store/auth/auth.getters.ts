import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthState } from '@/store/auth/types';

export default {
  isUserLoggedIn: state => !!state.addressBook,
  addressBookId: state => state.addressBook && state.addressBook.id,
} as GetterTree<AuthState, RootState>;
