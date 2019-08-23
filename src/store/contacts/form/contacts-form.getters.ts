import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { ContactsFormState } from '@/store/contacts/form/types';
import { Contact } from '@/store/contacts/types';

const getters: GetterTree<ContactsFormState, RootState> = {
  isEdit: state => !!state.id,
  contact: (state): Contact => ({
    id: state.id,
    groupId: state.groupId,
    name: state.name,
    phone: state.phone,
    pictureUrl: state.pictureUrl,
  }),
};

export default getters;
