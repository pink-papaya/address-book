/* istanbul ignore file */
import state from './contacts.state';
import mutations from './contacts.mutations';
import actions from './contacts.actions';
import getters from './contacts.getters';
import form from './form';

export default {
  namespaced: true,
  modules: {
    form,
  },
  state,
  mutations,
  actions,
  getters,
};
