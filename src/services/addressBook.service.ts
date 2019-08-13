import api from '@/http/api';
import { AddressBook } from '@/services/types';

class AddressBookService {
  public create(username: string, password: string): Promise<{}> {
    return api.post('create', { username, password });
  }

  public getAll(): Promise<AddressBook[]> {
    return api.get('/');
  }

  public getById(id: string): Promise<AddressBook> {
    return api.get(id);
  }

  public async login(username: string, password: string): Promise<AddressBook> {
    const addressBooks = await this.getAll();

    const addressBook = addressBooks.find(
      book => book.username === username && book.password === password,
    );

    if (!addressBook) {
      throw new Error('Invalid login');
    }

    return addressBook;
  }

  public updatePassword(
    id: string,
    username: string,
    password: string,
  ): Promise<AddressBook> {
    return api.put(id, { id, username, password });
  }
}

export default new AddressBookService();
