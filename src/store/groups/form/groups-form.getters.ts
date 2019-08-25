import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { GroupsFormState } from '@/store/groups/form/types';
import { Group } from '@/store/groups/types';

const getters: GetterTree<GroupsFormState, RootState> = {
  isEdit: state => !!state.id,
  group: (state: Group) => ({
    id: state.id,
    name: state.name,
    description: state.description,
    pictureUrl: state.pictureUrl,
  }),
};

export default getters;
