import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { GroupsState } from '@/store/groups/types';

export default {
  groups: state => Object.values(state.groups),
  getGroupById: state => (id: string) => state.groups[id],
  selectedGroup: state =>
    state.selectedGroupId && state.groups[state.selectedGroupId],
} as GetterTree<GroupsState, RootState>;
