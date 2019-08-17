export interface Contact {
  groupId: string;
  name: string;
  phone: string;
  pictureUrl?: string;
}

export type ContactMap = { [contactName: string]: Contact };

export interface ContactsState {
  contacts: ContactMap;
  isLoading: boolean;
}
