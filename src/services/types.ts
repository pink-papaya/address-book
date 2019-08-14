import { Contact } from '@/store/contacts/types';
import { Group } from '@/store/groups/types';

export interface AddressBook {
  id: string;
  username: string;
  password: string;
  groups: Group[];
  contacts: Contact[];
}
