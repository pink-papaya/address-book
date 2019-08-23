import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { Contact, ContactsState, DynamicContact } from '@/store/contacts/types';

const getters: GetterTree<ContactsState, RootState> = {
  contacts: (
    state,
    getters,
    rootState,
    { 'groups/groupById': groupById },
  ) =>
    Object.values(state.contacts)
      .map(contact => {
        const group = groupById(contact.groupId);

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
          searchFn((contact[key] as string) || '', searchQuery),
        );
      });
    }

    return filters.reduce((result, filter) => result.filter(filter), contacts);
  },
  contactByName: (state, getters) => (name: string) =>
    getters.contacts.find(
      (contact: DynamicContact) =>
        contact.name.toLowerCase() === name.toLowerCase(),
    ),
  contactById: state => (id: number) => state.contacts[id],
};

export default getters;
