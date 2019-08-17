export interface AddressBookSession {
  username: string;
  addressBookId: number;
}

export interface AuthState {
  addressBook?: AddressBookSession;
}
