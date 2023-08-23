import { UserToken } from './users-tokens';

describe('UserTokens', () => {
  it('should be able to create a token to a user', () => {
    const userToken = new UserToken({
      id: 'random-uuid',
      expires_at: new Date(),
      token: 'random-refresh-token',
      updated_at: new Date(),
      user_id: 'user-id',
      created_at: new Date(),
    });

    expect(userToken).toBeTruthy();
  });
});
