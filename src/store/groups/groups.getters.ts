import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { GroupsState } from '@/store/groups/types';

export default {
  groups: state => Object.values(state.groups),
} as GetterTree<GroupsState, RootState>;
