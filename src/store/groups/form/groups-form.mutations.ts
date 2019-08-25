import { MutationTree } from 'vuex';
import { GroupsFormState } from '@/store/groups/form/types';

const mutations: MutationTree<GroupsFormState> = {
  setId(state, value: string) {
    state.id = value;
  },
  setName(state, value: string) {
    state.name = value;
  },
  setDescription(state, value: string) {
    state.description = value;
  },
  setPictureUrl(state, value: string) {
    state.pictureUrl = value;
  },
};

export default mutations;
