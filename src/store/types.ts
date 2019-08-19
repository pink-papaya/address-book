import { AppState } from '@/store/app/types';
import { AuthState } from '@/store/auth/types';
import { GroupsState } from '@/store/groups/types';
import { ContactsState } from '@/store/contacts/types';
import { ModalsState } from '@/store/modals/types';

export interface RootState {
  app: AppState;
  auth: AuthState;
  groups: GroupsState;
  contacts: ContactsState;
  modals: ModalsState;
}
