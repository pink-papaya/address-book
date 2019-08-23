import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { GroupsState } from '@/store/groups/types';

const getters: GetterTree<GroupsState, RootState> = {
  groups: state => Object.values(state.groups),
  groupById: state => (id: string) => state.groups[id],
  selectedGroup: state =>
    state.selectedGroupId && state.groups[state.selectedGroupId],
};

export default getters;
