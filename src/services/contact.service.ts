import api from '@/http/api';
import { AddressBook } from '@/services/types';
import { Contact } from '@/store/contacts/types';

class AddressBookService {
  public async create(
    addressBookId: string,
    contact: Contact,
  ): Promise<Contact> {
    return api.post(`/${addressBookId}/contacts`, contact);
  }
}

export default new AddressBookService();
