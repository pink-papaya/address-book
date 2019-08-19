import getters from '@/store/auth/auth.getters';

describe('auth module getters', () => {
  describe('isUserLoggedIn', () => {
    it('should return true if addressBook is defined', () => {
      const result = (getters as any).isUserLoggedIn({
        addressBook: {},
      });

      expect(result).toBe(true);
    });

    it('should return false if addressBook is undefined', () => {
      const result = (getters as any).isUserLoggedIn({
        addressBook: undefined,
      });

      expect(result).toBe(false);
    });
  });
});
