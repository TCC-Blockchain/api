import { User } from './users';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      name: 'John',
      document: '123123123',
      email: 'john@doe.com',
      password: '123',
      phone: '+552113123',
      registry_office_id: '123123',
      username: 'john.doe',
    });

    expect(user).toBeTruthy();
  });
});
