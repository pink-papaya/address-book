import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { Group, GroupsState } from '@/store/groups/types';
import db from '@/db';
import groupService from '@/services/group.service';

const actions: ActionTree<GroupsState, RootState> = {
  async saveGroup({ dispatch, getters }, group: Group) {
    return group.id
      ? dispatch('updateGroup', group)
      : dispatch('addGroup', group);
  },

  async addGroup({ commit, dispatch, rootGetters }, group: Group) {
    group.id = `group-${Date.now()}`;

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

  async updateGroup({ commit, dispatch, getters, rootGetters }, group) {
    const originalGroup = getters.groupById(group.id);

    await (await db).put('groups', group);
    commit('updateGroup', group);

    try {
      await groupService.update(rootGetters['auth/addressBookId'], group);
    } catch (e) {
      dispatch('rollBackUpdate', originalGroup);
      throw e;
    }
  },

  async rollBackUpdate({ commit }, originalGroup: Group) {
    await (await db).put('groups', originalGroup);

    commit('updateGroup', {
      id: originalGroup.id,
      contact: originalGroup,
    });
  },

  async deleteGroup({ commit, dispatch, getters, rootGetters }, group: Group) {
    await (await db).delete('groups', group.id);
    commit('deleteGroup', group);

    try {
      await groupService.delete(rootGetters['auth/addressBookId'], group);
    } catch (e) {
      /* @todo: show error notification */
      dispatch('rollBackDelete', group);
      throw e;
    }
  },

  async rollBackDelete({ commit }, originalGroup: Group) {
    await (await db).put('groups', originalGroup);

    commit('addGroup', originalGroup);
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
};

export default actions;
