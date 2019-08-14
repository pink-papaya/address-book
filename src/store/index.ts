import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import app from './app';
import auth from './auth';
import groups from './groups';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
    auth,
    groups,
  },
};

export default new Vuex.Store<RootState>(store);
