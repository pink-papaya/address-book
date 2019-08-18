/* istanbul ignore file */
import state from './contacts.state';
import mutations from './contacts.mutations';
import actions from './contacts.actions';
import getters from './contacts.getters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
