import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthState } from '@/store/auth/types';

export default {
  isUserLoggedIn: state => !!state.addressBook,
} as GetterTree<AuthState, RootState>;
