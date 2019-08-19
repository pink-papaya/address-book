import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { Contact, ContactsState } from '@/store/contacts/types';

export default {
  contacts: state => Object.values(state.contacts),
  filteredContacts: (state, getters, { groups }) => {
    const contacts: Contact[] = getters.contacts;
    if (groups.selectedGroupId) {
      return contacts.filter(
        contact => contact.groupId === groups.selectedGroupId,
      );
    }

    return contacts;
  },
} as GetterTree<ContactsState, RootState>;
