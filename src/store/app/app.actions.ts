import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { AppState } from '@/store/app/types';

const actions: ActionTree<AppState, RootState> = {
  /**
   * Closes "add to home screen" modal for apple
   */
  closeAddToHomeScreenModalForApple: async ({ commit }) => {
    localStorage.setItem('addToHomeIosPromptLastDate', Date.now().toString());
    commit('setShowAddToHomeScreenModalForApple', false);
  },

  /**
   * Trigger service worker skipWaiting so the new service worker can take over.
   * This will also trigger a window refresh (see /src/misc/register-service-worker.js)
   */
  serviceWorkerSkipWaiting({ state, commit }) {
    const serviceWorker = state.SWRegistrationForNewContent;
    if (!serviceWorker) {
      return;
    }

    commit('setRefreshingApp', true);
    serviceWorker.waiting!.postMessage('skipWaiting');
  },

  toggleSideMenu({ state, commit }) {
    commit('setIsSideMenuOpen', !state.isSideMenuOpen);
  },
};

export default actions;
