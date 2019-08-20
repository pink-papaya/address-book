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

  public getByName(id: string): Promise<AddressBook> {
    return api.get(id);
  }
}

export default new AddressBookService();
