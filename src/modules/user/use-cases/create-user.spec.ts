import { BCryptHashProvider } from '@providers/HashProvider/implementations/bcrypt-hash-provider';
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { UserGendersEnum } from '../entities/users';
import { CreateUser } from './create-user';

describe('Create user', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const hashProvider = new BCryptHashProvider();
    const createUser = new CreateUser(usersRepository, hashProvider);

    const { user } = await createUser.execute({
      username: 'test-username',
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123',
      phone: '+5511999',
      document: '444444444',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
    expect(usersRepository.address).toBeTruthy();
  });
});
