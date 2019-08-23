import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { Contact, ContactsState } from '@/store/contacts/types';
import db from '@/db';
import contactService from '@/services/contact.service';

const actions: ActionTree<ContactsState, RootState> = {
  async saveContact({ dispatch, getters }, contact) {
    return getters['form/isEdit']
      ? dispatch('updateContact', contact)
      : dispatch('addContact', contact);
  },

  async addContact({ commit, dispatch, rootGetters }, contact) {
    try {
      // idb can't handle undefined as the keypath value
      delete contact.id;

      contact.id = await (await db).add('contacts', contact);
    } catch (e) {
      throw new Error('Database error');
    }

    commit('addContact', contact);

    try {
      await contactService.create(rootGetters['auth/addressBookId'], {
        ...contact,
        id: undefined,
      });
    } catch (e) {
      /* @todo: show error notification */
      dispatch('rollBackCreate', contact);
    }
  },

  async rollBackCreate({ commit }, contact: Contact) {
    await (await db).delete('contacts', contact.name);
    commit('deleteContact', contact);
  },

  async updateContact({ commit, dispatch, getters, rootGetters }, contact) {
    const originalContact = getters.contactById(contact.id);

    await (await db).put('contacts', contact);
    commit('updateContact', { id: contact.id, contact });

    try {
      await contactService.update(
        rootGetters['auth/addressBookId'],
        originalContact.name,
        {
          ...contact,
          id: undefined,
        },
      );
    } catch (e) {
      /* @todo: show error notification */
      dispatch('rollBackUpdate', originalContact);
    }
  },

  async rollBackUpdate({ commit }, originalContact: Contact) {
    await (await db).put('contacts', originalContact);

    commit('updateContact', {
      id: originalContact.id,
      contact: originalContact,
    });
  },

  async storeContacts({ commit, dispatch }, contacts: Contact[]) {
    const tx = (await db).transaction('contacts', 'readwrite');
    tx.store.clear();
    contacts.forEach(contact => {
      tx.store.put(contact);
    });
    await tx.done;

    // we need to populate the contacts with the local db ids
    // before loading them into vuex
    await dispatch('loadContactsFromDb');
  },

  async loadContactsFromDb({ commit }) {
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

  init: {
    root: true,
    async handler({ dispatch }) {
      dispatch('loadContactsFromDb');
    },
  },
};

export default actions;
