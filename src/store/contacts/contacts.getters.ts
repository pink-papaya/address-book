import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { ContactsState } from '@/store/contacts/types';

export default {
  contacts: state => Object.values(state.contacts),
} as GetterTree<ContactsState, RootState>;
