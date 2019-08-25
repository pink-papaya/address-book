import { DBSchema } from 'idb';
import { Contact } from '@/store/contacts/types';
import { Group } from '@/store/groups/types';

export interface AppDB extends DBSchema {
  groups: {
    key: string;
    value: Group;
  };
  contacts: {
    key: number;
    value: Contact;
  };
}
