import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { AppState } from '@/store/app/types';

const getters: GetterTree<AppState, RootState> = {
  newContentAvailable: state => !!state.SWRegistrationForNewContent,
};

export default getters;
