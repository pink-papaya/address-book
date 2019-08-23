import Vue from 'vue';
import { MutationTree } from 'vuex';
import { Contact, ContactMap, ContactsState } from '@/store/contacts/types';

const mutations: MutationTree<ContactsState> = {
  addContact(state, contact: Contact) {
    Vue.set(state.contacts, contact.name, contact);
  },
  deleteContact(state, contact: Contact) {
    Vue.delete(state.contacts, contact.name);
  },
  storeContacts(state, contacts: Contact[]) {
    state.contacts = contacts.reduce(
      (acc, contact) => {
        acc[contact.name] = contact;
        return acc;
      },
      {} as ContactMap,
    );
  },
  setLoading(state, value: boolean) {
    state.isLoading = value;
  },
  setSearchQuery(state, value: string) {
    state.searchQuery = value;
  },
};

export default mutations;
