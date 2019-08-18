import { ActionHandler } from 'vuex';
import actions from '@/store/app/app.actions';
import { AppState } from '@/store/app/types';
import { RootState } from '@/store/types';

const commit = jest.fn();

afterEach(() => {
  commit.mockReset();
});

describe('app module action', () => {
  describe('closeAddToHomeScreenModalForApple', () => {
    it('should set the state of the modal as closed', () => {
      const action: any = actions.closeAddToHomeScreenModalForApple;
      action({ commit });
      expect(commit).toHaveBeenCalledWith(
        'setShowAddToHomeScreenModalForApple',
        false,
      );
    });
  });

  describe('serviceWorkerSkipWaiting', () => {
    it('should set app refreshing status and call sw postMessage with skipWaiting', () => {
      const state = {
        SWRegistrationForNewContent: {
          waiting: {
            postMessage: jest.fn(),
          },
        },
      };

      const action: any = actions.serviceWorkerSkipWaiting;

      action({ commit, state });

      expect(commit).toHaveBeenCalledWith('setRefreshingApp', true);
      expect(
        state.SWRegistrationForNewContent.waiting.postMessage,
      ).toHaveBeenCalledWith('skipWaiting');
    });

    it('should not set app refreshing status and call sw postMessage with skipWaiting', () => {
      const state = {
        SWRegistrationForNewContent: null,
      };

      const action: any = actions.serviceWorkerSkipWaiting;

      action({ commit, state });

      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('toggleSideMenu', () => {
    it('should commit the set the menu flag to false when it is true', () => {
      const action: any = actions.toggleSideMenu;

      const state = {
        isSideMenuOpen: true,
      };

      action({ commit, state });
      expect(commit).toHaveBeenCalledWith('setIsSideMenuOpen', false);
    });
    it('should set the menu flag to true when it is false', () => {
      const action: any = actions.toggleSideMenu;

      const state = {
        isSideMenuOpen: false,
      };

      action({ commit, state });
      expect(commit).toHaveBeenCalledWith('setIsSideMenuOpen', true);
    });
  });
});
