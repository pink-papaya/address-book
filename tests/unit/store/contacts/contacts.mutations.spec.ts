import mutations from '@/store/contacts/contacts.mutations';
import { ContactsState } from '@/store/contacts/types';

describe('contacts module mutation', () => {
  describe('addContact', () => {
    it('should add the contact to the map', () => {
      const state = {
        contacts: {},
      } as ContactsState;

      const contact = { id: 1, name: 'name' };

      mutations.addContact(state, contact);

      expect(state).toEqual({
        contacts: {
          [contact.id]: contact,
        },
      });
    });
  });

  describe('deleteContact', () => {
    it('should remove the contact from the map', () => {
      const contact = { id: 1, name: 'name' };
      const state = {
        contacts: {
          [contact.id]: contact,
        },
      } as ContactsState;

      mutations.deleteContact(state, contact);

      expect(state).toEqual({
        contacts: {},
      });
    });
  });

  describe('storeContacts', () => {
    it('should replace the current contacts with the passed value', () => {
      const contact = { id: 1, name: 'name' };
      const state = {
        contacts: { 2: { id: 2, name: 'name2' } } as any,
      } as ContactsState;

      mutations.storeContacts(state, [contact]);

      expect(state).toEqual({
        contacts: {
          [contact.id]: contact,
        },
      });
    });
  });

  describe('setLoading', () => {
    it('should set isLoading to the passed value', () => {
      const state = {
        isLoading: false,
      } as ContactsState;

      mutations.setLoading(state, true);

      expect(state).toEqual({
        isLoading: true,
      });
    });
  });
});
