import Vue from 'vue';
import { MutationTree } from 'vuex';
import { Group, GroupMap, GroupsState } from '@/store/groups/types';

const mutations: MutationTree<GroupsState> = {
  storeGroups(state, groups: Group[]) {
    state.groups = groups.reduce(
      (acc, group) => {
        acc[group.id] = group;
        return acc;
      },
      {} as GroupMap,
    );
  },
  addGroup(state, group: Group) {
    Vue.set(state.groups, group.id, group);
  },
  deleteGroup(state, group: Group) {
    Vue.delete(state.groups, group.id);
  },
  updateGroup(state, group: Group) {
    state.groups[group.id] = group;
  },
  setLoading(state, value: boolean) {
    state.isLoading = value;
  },
  setSelectedGroupId(state, value?: string) {
    state.selectedGroupId = value;
  },
};

export default mutations;
