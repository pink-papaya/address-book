export interface Group {
  id: string;
  name: string;
  description: string;
}

export type GroupMap = { [groupId: string]: Group };

export interface GroupsState {
  groups: GroupMap;
  isLoading: boolean;
}
