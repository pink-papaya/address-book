import api from '@/http/api';
import { Group } from '@/store/groups/types';

class GroupService {
  public async create(addressBookId: string, group: Group): Promise<Group> {
    return api.post(`/${addressBookId}/groups`, group);
  }

  public async update(addressBookId: string, group: Group): Promise<number> {
    return api.put(`/${addressBookId}/groups/${group.id}`, group);
  }

  public async delete(addressBookId: string, group: Group): Promise<number> {
    return api.delete(`/${addressBookId}/groups/${group.id}`);
  }
}

export default new GroupService();
