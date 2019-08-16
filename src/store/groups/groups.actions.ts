import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { Group, GroupsState } from '@/store/groups/types';
import db from '@/db';

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

  async storeGroups({ commit }, groups: Group[]) {
    commit('storeGroups', groups);

    const tx = (await db).transaction('groups', 'readwrite');
    groups.forEach(group => {
      tx.store.put(group);
    });
    await tx.done;
  },
} as ActionTree<GroupsState, RootState>;
