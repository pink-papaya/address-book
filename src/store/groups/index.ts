/* istanbul ignore file */
import state from './groups.state';
import mutations from './groups.mutations';
import actions from './groups.actions';
import getters from './groups.getters';
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
