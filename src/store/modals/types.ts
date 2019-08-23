import { Contact } from '@/store/contacts/types';

export interface ModalsState {
  isCreateContactModalOpen: boolean;
  isViewContactModalOpen: boolean;
  isCreateGroupModalOpen: boolean;
  contactModalMode?: string;
  contactModalModel?: Contact;
}
