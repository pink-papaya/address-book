import { Contact } from '@/store/contacts/types';

export interface ModalsState {
  isContactModalOpen: boolean;
  isViewContactModalOpen: boolean;
  isGroupModalOpen: boolean;
  isChangePasswordModalOpen: boolean;
  contactModalModelId: Contact['id'];
}
