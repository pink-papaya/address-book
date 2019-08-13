export interface Group {
  id: string;
  name: string;
  description: string;
}

export interface Contact {
  groupId: string;
  name: string;
  phone: string;
  pictureUrl: string;
}

export interface AddressBook {
  id: string;
  username: string;
  password: string;
  groups: Group[];
  contacts: Contact[];
}
