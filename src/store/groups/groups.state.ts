import { GroupsState } from '@/store/groups/types';

const state: GroupsState = {
  groups: {},
  isLoading: false,
  selectedGroupId: undefined,
};

export default state;
