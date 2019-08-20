import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { Contact, ContactsState, DynamicContact } from '@/store/contacts/types';

export default {
  contacts: (
    state,
    getters,
    rootState,
    { 'groups/getGroupById': getGroupById },
  ) =>
    Object.values(state.contacts)
      .map(contact => {
        const group = getGroupById(contact.groupId);

        return {
          groupName: (group && group.name) || contact.groupId,
          ...contact,
        } as DynamicContact;
      })
      .sort((a, b) => a.name.localeCompare(b.name)),

  filteredContacts: ({ searchQuery }, getters, { groups }) => {
    const contacts: DynamicContact[] = getters.contacts;

    const filters = [];
    if (groups.selectedGroupId) {
      filters.push(
        (contact: Contact) => contact.groupId === groups.selectedGroupId,
      );
    }

    if (searchQuery) {
      const searchFn = (value: string, needle: string) =>
        value.toLowerCase().includes(needle.toLowerCase());

      filters.push((contact: DynamicContact) => {
        const searchableKeys: (keyof DynamicContact)[] = [
          'name',
          'phone',
          'groupName',
        ];
        return searchableKeys.some(key =>
          searchFn(contact[key] || '', searchQuery),
        );
      });
    }

    return filters.reduce((result, filter) => result.filter(filter), contacts);
  },
} as GetterTree<ContactsState, RootState>;
