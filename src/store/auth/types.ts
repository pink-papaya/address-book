export interface AddressBookSession {
  username: string;
  id: string;
}

export interface AuthState {
  addressBook?: AddressBookSession;
}
