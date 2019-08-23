import api from '@/http/api';
import { ApiContact, Contact } from '@/store/contacts/types';

class ContactService {
  public async create(
    addressBookId: string,
    contact: Contact,
  ): Promise<ApiContact> {
    return api.post(`/${addressBookId}/contacts`, contact);
  }

  public async update(
    addressBookId: string,
    originalName: ApiContact['name'],
    contact: ApiContact,
  ): Promise<number> {
    return api.put(`/${addressBookId}/contacts/${originalName}`, contact);
  }

  public async delete(
    addressBookId: string,
    contact: Contact,
  ): Promise<number> {
    return api.delete(`/${addressBookId}/contacts/${contact.name}`);
  }
}

export default new ContactService();
