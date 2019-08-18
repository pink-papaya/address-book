import actions from '@/store/contacts/contacts.actions';

const commit = jest.fn();
const dispatch = jest.fn();

afterEach(() => {
  commit.mockReset();
  dispatch.mockReset();
});

describe('contacts module action', () => {
  describe('addContact', () => {
    it('should store the contact', () => {
      const action: any = actions.addContact;
      const contact = {};

      action({ commit }, contact);

      expect(commit).toHaveBeenCalledWith('addContact', contact);
    });
  });

  describe('storeContacts', () => {
    it('should store the contacts', async () => {
      const action: any = actions.storeContacts;
      const contacts: any = [];

      await action({ commit, dispatch }, contacts);
      expect(commit).toHaveBeenCalledWith('storeContacts', contacts);
    });
  });

  describe('init', () => {
    it('should be a root action', () => {
      const action: any = actions.init;

      expect(action.root).toBe(true);
    });

    it('should set the loading state to true while storing the contacts', async () => {
      const action: any = actions.init;

      await action.handler({ commit });

      expect(commit).toHaveBeenCalledWith('setLoading', true);
      expect(commit).toHaveBeenCalledWith('setLoading', false);
    });
  });
});
