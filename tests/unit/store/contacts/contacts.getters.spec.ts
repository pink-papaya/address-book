import getters from '@/store/contacts/contacts.getters';

describe('contacts module getters', () => {
  describe('contacts', () => {
    it('should return an array of the contacts in the state map', () => {
      const contact = { name: 'name' };
      const result = (getters as any).contacts({
        contacts: { name: contact },
      });

      expect(result).toEqual([contact]);
    });
  });
});
