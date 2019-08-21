import api from '@/http/api';
import { Contact } from '@/store/contacts/types';
import { Group } from '@/store/groups/types';

class AddressBookService {
  public async create(addressBookId: string, group: Group): Promise<Contact> {
    return api.post(`/${addressBookId}/groups`, group);
  }
}

export default new AddressBookService();
