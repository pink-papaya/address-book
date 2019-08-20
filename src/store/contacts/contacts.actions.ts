import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { Contact, ContactsState } from '@/store/contacts/types';
import db from '@/db';
import contactService from '@/services/contact.service';

export default {
  async addContact({ commit, dispatch, rootGetters }, contact) {
    try {
      await (await db).add('contacts', contact);
    } catch (e) {
      throw new Error('Contact name already exists');
    }

    commit('addContact', contact);

    try {
      await contactService.create(rootGetters['auth/addressBookId'], contact);
    } catch (e) {
      /* @todo: show error notification */
      dispatch('rollBackCreate', contact);
    }
  },

  async rollBackCreate({ commit }, contact: Contact) {
    await (await db).delete('contacts', contact.name);
    commit('deleteContact', contact);
  },

  async storeContacts({ commit }, contacts: Contact[]) {
    commit('storeContacts', contacts);

    const tx = (await db).transaction('contacts', 'readwrite');
    tx.store.clear();
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
