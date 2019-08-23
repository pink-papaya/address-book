import { ContactsState } from '@/store/contacts/types';

const state: ContactsState = {
  contacts: {},
  isLoading: false,
  searchQuery: '',
};

export default state;
