export interface Group {
  id: string;
  name: string;
  description: string;
}

export interface GroupsState {
  groups: { [groupId: string]: Group };
}
