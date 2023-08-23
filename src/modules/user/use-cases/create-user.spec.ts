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
      name: 'John',
      birth_date: JSON.stringify(new Date()),
      email: 'john@test.com',
      gender: UserGendersEnum.MALE,
      password: 'password',
      neighborhood: 'San Francisco',
      username: 'john_test',
      zip_code: '18000999',
      street: 'St test',
      number: '132',
      city: 'San Francisco',
      country: 'United States',
      state: 'California',
      phone: '+55',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
    expect(usersRepository.address).toBeTruthy();
  });
});
