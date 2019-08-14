import Vue from 'vue';
import { MutationTree } from 'vuex';
import { Contact, ContactsState } from '@/store/contacts/types';

export default {
  addContact(state, contact: Contact) {
    Vue.set(state.contacts, contact.name, contact);
  },
  deleteContact(state, contact: Contact) {
    Vue.delete(state.contacts, contact.name);
  },
} as MutationTree<ContactsState>;
