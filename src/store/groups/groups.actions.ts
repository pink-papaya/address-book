import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { Group, GroupsState } from '@/store/groups/types';
import db from '@/db';
import groupService from '@/services/group.service';

export default {
  async addGroup({ commit, dispatch, rootGetters }, group: Group) {
    await (await db).add('groups', group);

    commit('addGroup', group);
    try {
      await groupService.create(rootGetters['auth/addressBookId'], group);
    } catch (e) {
      /* @todo: show error notification */
      dispatch('rollBackCreate', group);
    }
  },

  async rollBackCreate({ commit }, group: Group) {
    await (await db).delete('groups', group.id);
    commit('deleteGroup', group);
  },

  selectGroup({ commit }, groupId?: string) {
    commit('setSelectedGroupId', groupId);
  },

  async storeGroups({ commit }, groups: Group[]) {
    commit('storeGroups', groups);

    const tx = (await db).transaction('groups', 'readwrite');
    tx.store.clear();
    groups.forEach(group => {
      tx.store.put(group);
    });
    await tx.done;
  },

  init: {
    root: true,
    async handler({ commit }) {
      commit('setLoading', true);

      let groups: Group[] = [];

      let cursor = await (await db).transaction('groups').store.openCursor();

      while (cursor) {
        groups.push(cursor.value);
        cursor = await cursor.continue();
      }

      commit('storeGroups', groups);

      commit('setLoading', false);
    },
  },
} as ActionTree<GroupsState, RootState>;
