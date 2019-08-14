import Vue from 'vue';
import { MutationTree } from 'vuex';
import { Group, GroupsState } from '@/store/groups/types';

export default {
  addGroup(state, group: Group) {
    Vue.set(state.groups, group.id, group);
  },
  updateGroupId(state, { oldId, group }: { oldId: string; group: Group }) {
    Vue.delete(state.groups, oldId);
    Vue.set(state.groups, group.id, group);
  },
  deleteGroup(state, group: Group) {
    Vue.delete(state.groups, group.id);
  },
} as MutationTree<GroupsState>;
