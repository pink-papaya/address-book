import getters from '@/store/auth/auth.getters';

describe('auth module getters', () => {
  describe('isUserLoggedIn', () => {
    it('should return true if addressBook is defined', () => {
      const result = getters.isUserLoggedIn(
        {
          addressBook: {},
        } as any,
        null,
        {},
        null,
      );

      expect(result).toBe(true);
    });

    it('should return false if addressBook is undefined', () => {
      const result = getters.isUserLoggedIn(
        {
          addressBook: undefined,
        } as any,
        null,
        {},
        null,
      );

      expect(result).toBe(false);
    });
  });
});
