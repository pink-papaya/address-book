export interface Contact {
  groupId: string;
  name: string;
  phone: string;
  pictureUrl: string;
}

export interface ContactsState {
  contacts: { [contactName: string]: Contact };
}
