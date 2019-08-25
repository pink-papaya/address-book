import getters from '@/store/contacts/contacts.getters';

describe('contacts module getters', () => {
  describe('contacts', () => {
    it('should return an array of the contacts in the state map sorted by name and with the groupName filled', () => {
      const contact1 = { name: 'cba', groupId: 1 };
      const contact2 = { name: 'abc', groupId: 1 };
      const group = { id: 1, name: 'group name' };

      const result = (getters as any).contacts(
        {
          contacts: { 1: contact1, 2: contact2 },
        },
        {},
        {},
        { 'groups/groupById': () => group },
      );

      expect(result).toEqual([
        { ...contact2, groupName: group.name },
        { ...contact1, groupName: group.name },
      ]);
    });
  });
});
