import getters from '@/store/contacts/contacts.getters';

describe('contacts module getters', () => {
  describe('contacts', () => {
    it('should return an array of the contacts in the state map', () => {
      const contact = { name: 'name' };
      const result = getters.contacts(
        {
          contacts: { name: contact },
        } as any,
        null,
        {},
        null,
      );

      expect(result).toEqual([contact]);
    });
  });
});
