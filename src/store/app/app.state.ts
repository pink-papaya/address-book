import { AppState } from '@/store/app/types';

const state: AppState = {
  appTitle: process.env.VUE_APP_TITLE as string,
  appShortTitle: process.env.VUE_APP_SHORT_TITLE as string,
  networkOnLine: true,
  SWRegistrationForNewContent: undefined,
  showAddToHomeScreenModalForApple: false,
  refreshingApp: false,
  isSideMenuOpen: window.innerWidth > 768,
};

export default state;
