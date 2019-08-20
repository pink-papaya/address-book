export interface Contact {
  groupId: string;
  name: string;
  phone: string;
  pictureUrl?: string;
}

export interface DynamicContact extends Contact {
  groupName: string;
}

export type ContactMap = { [contactName: string]: Contact };

export interface ContactsState {
  contacts: ContactMap;
  isLoading: boolean;
  searchQuery: string;
}
