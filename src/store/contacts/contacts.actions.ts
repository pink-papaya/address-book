import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { Contact, ContactsState } from '@/store/contacts/types';
import db from '@/db';

export default {
  addContact({ commit }, contact) {
    commit('addContact', contact);
  },

  async storeContacts({ commit }, contacts: Contact[]) {
    commit('storeContacts', contacts);

    const tx = (await db).transaction('contacts', 'readwrite');
    contacts.forEach(contact => {
      tx.store.put(contact);
    });
    await tx.done;
  },

  init: {
    root: true,
    async handler({ commit }) {
      commit('setLoading', true);

      const contacts: Contact[] = [];

      let cursor = await (await db).transaction('contacts').store.openCursor();

      while (cursor) {
        contacts.push(cursor.value);
        cursor = await cursor.continue();
      }

      commit('storeContacts', contacts);

      commit('setLoading', false);
    },
  },
} as ActionTree<ContactsState, RootState>;
