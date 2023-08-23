import { CreateUser } from '@modules/user/use-cases/create-user';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DayjsDateProvider } from '@providers/DateProvider/implementations/dayjs-date-provider';
import { BCryptHashProvider } from '@providers/HashProvider/implementations/bcrypt-hash-provider';
import { makeAddress } from '@test/factories/addresses-factory';
import { makeUser } from '@test/factories/users-factory';
import { InMemoryUsersTokensRepository } from '@test/repositories/in-memory-users-tokens-repository';
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { AuthService } from '../auth.service';
import { CreateSession } from './create-session';

describe('Create user session', () => {
  it('should be able to create a session to a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const hashProvider = new BCryptHashProvider();
    const dateProvider = new DayjsDateProvider();
    const jwtService = new JwtService();
    const createSession = new CreateSession(
      usersTokensRepository,
      jwtService,
      dateProvider,
      usersRepository,
    );
    const authService = new AuthService(usersRepository, hashProvider);

    const createUser = new CreateUser(usersRepository, hashProvider);

    const createdUser = makeUser({
      email: 'test@bikestyle.app',
      password: 'test-password',
    });

    const createdAddress = makeAddress({
      neighborhood: 'San Francisco',
      zip_code: '18000999',
      street: 'St test',
      number: '132',
      city: 'San Francisco',
      country: 'United States',
      state: 'California',
    });

    await createUser.execute({
      name: createdUser.name,
      birth_date: createdUser.birth_date.toISOString(),
      email: createdUser.email,
      gender: createdUser.gender,
      password: createdUser.password,
      username: createdUser.username,
      neighborhood: createdAddress.neighborhood || '',
      zip_code: createdAddress.zip_code || '',
      street: createdAddress.street || '',
      number: createdAddress.number || '',
      city: createdAddress.city,
      country: createdAddress.country,
      state: createdAddress.state,
      phone: createdUser.phone,
    });

    const request_user = await authService.validateUser(
      'test@bikestyle.app',
      'test-password',
    );

    const { access_token, refresh_token, user } = await createSession.execute(
      request_user,
    );

    expect(access_token).toBeTruthy();
    expect(refresh_token).toBeTruthy();
    expect(user).toBeTruthy();
  });

  it('should not be able to create a session to a user with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const hashProvider = new BCryptHashProvider();

    const authService = new AuthService(usersRepository, hashProvider);

    const createUser = new CreateUser(usersRepository, hashProvider);

    const createdUser = makeUser();

    const createdAddress = makeAddress();

    await createUser.execute({
      name: createdUser.name,
      birth_date: createdUser.birth_date.toISOString(),
      email: createdUser.email,
      gender: createdUser.gender,
      password: createdUser.password,
      username: createdUser.username,
      neighborhood: createdAddress.neighborhood || '',
      zip_code: createdAddress.zip_code || '',
      street: createdAddress.street || '',
      number: createdAddress.number || '',
      city: createdAddress.city,
      country: createdAddress.country,
      state: createdAddress.state,
      phone: createdUser.phone,
    });

    await expect(
      authService.validateUser('test@bikestyle.app', '123'),
    ).rejects.toThrow(UnauthorizedException);
  });
});
