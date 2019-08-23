import { ModalsState } from '@/store/modals/types';

const state: ModalsState = {
  isCreateContactModalOpen: false,
  isViewContactModalOpen: false,
  isCreateGroupModalOpen: false,
  contactModalMode: undefined,
  contactModalModel: undefined,
};

export default state;
