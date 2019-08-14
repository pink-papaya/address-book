import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { GroupsState } from '@/store/groups/types';

export default {
  add({ commit }, group = { name: 'name' }) {
    const oldId = `temp-${Date.now()}`;

    commit('addGroup', { ...group, id: oldId });
    const newGroup = { id: Date.now(), name: 'group' };

    setTimeout(() => {
      commit('updateGroupId', {
        oldId,
        group: newGroup,
      });
    }, 1000);
  },
} as ActionTree<GroupsState, RootState>;
