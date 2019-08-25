import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { GroupsFormState } from '@/store/groups/form/types';
import { Group } from '@/store/groups/types';

const actions: ActionTree<GroupsFormState, RootState> = {
  loadGroup({ commit, dispatch }, group?: Group) {
    if (!group) {
      dispatch('clearGroup');
      return;
    }

    commit('setId', group.id);
    commit('setName', group.name);
    commit('setDescription', group.description);
    commit('setPictureUrl', group.pictureUrl);
  },

  clearGroup({ commit }) {
    commit('setId', undefined);
    commit('setName', '');
    commit('setDescription', '');
    commit('setPictureUrl', '');
  },
};

export default actions;
