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

  public async updatePassword(
    id: string,
    username: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<AddressBook> {
    const addressBook = await this.getById(id);

    if (addressBook.password !== oldPassword) {
      throw new Error('Wrong old password');
    }

    return api.put(id, { id, username, password: newPassword });
  }

  public delete(id: string) {
    return api.delete(id);
  }
}

export default new AddressBookService();
