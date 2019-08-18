import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import app from './app';
import auth from './auth';
import groups from './groups';
import contacts from './contacts';
import modals from './modals';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
    auth,
    groups,
    contacts,
    modals,
  },
};

const store = new Vuex.Store<RootState>(storeOptions);

store.dispatch('init');

export default store;
