export interface Group {
  id: string;
  name: string;
  description: string;
  pictureUrl: string;
}

export type GroupMap = { [groupId: string]: Group };

export interface GroupsState {
  groups: GroupMap;
  selectedGroupId?: string;
  isLoading: boolean;
}
