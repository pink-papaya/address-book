import api from '@/http/api';
import { AddressBook } from '@/services/types';

class AddressBookService {
  public async create(username: string, password: string): Promise<{}> {
    const addressBooks = await this.getAll();

    if (addressBooks.find(book => book.username === username)) {
      throw new Error('Username already exists');
    }

    return api.post('/', { username, password });
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
