import { MutationTree } from 'vuex';
import { AppState } from '@/store/app/types';

export default {
  setNetworkOnline(state, value) {
    state.networkOnLine = value;
  },
  setSWRegistrationForNewContent(state, value) {
    state.SWRegistrationForNewContent = value;
  },
  setShowAddToHomeScreenModalForApple(state, value) {
    state.showAddToHomeScreenModalForApple = value;
  },
  setRefreshingApp(state, value) {
    state.refreshingApp = value;
  },
  setIsSideMenuOpen(state, value) {
    state.isSideMenuOpen = value;
  },
} as MutationTree<AppState>;
