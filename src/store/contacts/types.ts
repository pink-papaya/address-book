import { ContactsFormState } from '@/store/contacts/form/types';

export interface ApiContact {
  groupId: string;
  name: string;
  phone: string;
  pictureUrl?: string;
}

export interface Contact extends ApiContact {
  id?: number;
}

export interface DynamicContact extends Contact {
  groupName: string;
}

export type ContactMap = { [id: number]: Contact };

export interface ContactsState {
  contacts: ContactMap;
  isLoading: boolean;
  searchQuery: string;
}
