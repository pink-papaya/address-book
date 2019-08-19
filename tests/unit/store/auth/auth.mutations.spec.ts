import mutations from '@/store/auth/auth.mutations';

describe('auth module mutation', () => {
  describe('setSession', () => {
    it('should set the session state to the value given in parameter', () => {
      const state = {
        addressBook: undefined,
      };

      const session = { username: 'name', id: 'id' };

      mutations.setSession(state, session);

      expect(state).toEqual({
        addressBook: session,
      });
    });
  });
});
