import actions from '@/store/auth/auth.actions';
import addressBookService from '@/services/addressBook.service';
import router from '@/router';

jest.mock('@/router', () => ({
  __esModule: true,
  default: { push: jest.fn() },
}));
jest.mock('@/services/addressBook.service', () => ({
  __esModule: true,
  default: { create: jest.fn(), login: jest.fn() },
}));

const commit = jest.fn();
const dispatch = jest.fn();

afterEach(() => {
  commit.mockReset();
  dispatch.mockReset();
});

describe('auth module action', () => {
  describe('register', () => {
    it('should call the create method of the addressBook service', () => {
      const action: any = actions.register;
      const username = 'user';
      const password = 'pass';

      action({}, { username, password });
      expect(addressBookService.create).toHaveBeenCalledWith(
        username,
        password,
      );
    });
  });

  describe('login', () => {
    const action: any = actions.login;
    const username = 'user';
    const password = 'pass';

    it('should attempt to login with the provided credentials', () => {
      action({ commit, dispatch }, { username, password });
      expect(addressBookService.login).toHaveBeenCalledWith(username, password);
    });

    describe('when login is successful', () => {
      const id = 'id';
      it('should store the addressBook id and username ', async () => {
        (<any>addressBookService).login.mockReturnValueOnce(
          Promise.resolve({
            id,
            username,
          }),
        );
        await action({ commit, dispatch }, { username, password });

        expect(commit).toHaveBeenCalledWith('setSession', { id, username });
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'address-book-session',
          JSON.stringify({ id, username }),
        );
      });

      it('should dispatch actions to store contacts and groups ', async () => {
        const contacts = [{ name: 'contact' }];
        const groups = [{ name: 'group' }];
        (<any>addressBookService).login.mockReturnValueOnce(
          Promise.resolve({
            id,
            username,
            groups,
            contacts,
          }),
        );
        await action({ commit, dispatch }, { username, password });

        expect(dispatch).toHaveBeenCalledWith(
          'contacts/storeContacts',
          contacts,
          { root: true },
        );
        expect(dispatch).toHaveBeenCalledWith('groups/storeGroups', groups, {
          root: true,
        });
      });
    });
  });

  describe('logout', () => {
    it('should clear session data and redirect to the login route', () => {
      const action: any = actions.logout;

      action({ commit });
      expect(commit).toHaveBeenCalledWith('setSession', undefined);
      expect(localStorage.removeItem).toHaveBeenCalledWith(
        'address-book-session',
      );

      expect(router.push).toHaveBeenCalledWith('/login');
    });
  });

  describe('init', () => {
    it('should be a root action', () => {
      const action: any = actions.init;

      expect(action.root).toBe(true);
    });

    it('should load the session data from local storage when set', () => {
      const action: any = actions.init;
      const session = {};

      (<any>localStorage).getItem.mockReturnValueOnce(JSON.stringify(session));

      action.handler({ commit });

      expect(commit).toHaveBeenCalledWith('setSession', session);
    });

    it('should do nothing when there is no data', () => {
      const action: any = actions.init;
      const session = {};

      (<any>localStorage).getItem.mockReturnValueOnce(null);

      action.handler({ commit });

      expect(commit).not.toBeCalled();
    });
  });
});
