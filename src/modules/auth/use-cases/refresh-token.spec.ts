import { UserGendersEnum } from '@modules/user/entities/users';
import { CreateUser } from '@modules/user/use-cases/create-user';
import { JwtService } from '@nestjs/jwt';
import { DayjsDateProvider } from '@providers/DateProvider/implementations/dayjs-date-provider';
import { BCryptHashProvider } from '@providers/HashProvider/implementations/bcrypt-hash-provider';
import { InMemoryUsersTokensRepository } from '@test/repositories/in-memory-users-tokens-repository';
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { AuthService } from '../auth.service';
import { CreateSession } from './create-session';
import { RefreshToken } from './refresh-token';

describe('Refresh token of a user', () => {
  it('should be able to refresh token of a user', async () => {
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const usersRepository = new InMemoryUsersRepository();
    const hashProvider = new BCryptHashProvider();
    const jwtService = new JwtService();
    const dateProvider = new DayjsDateProvider();
    const createUser = new CreateUser(usersRepository, hashProvider);

    const refreshToken = new RefreshToken(
      usersTokensRepository,
      usersRepository,
      jwtService,
      dateProvider,
    );
    const authService = new AuthService(usersRepository, hashProvider);

    const createSession = new CreateSession(
      usersTokensRepository,
      jwtService,
      dateProvider,
      usersRepository,
    );

    await createUser.execute({
      name: 'Bike Style',
      birth_date: JSON.stringify(new Date()),
      email: 'test@bikestyle.app',
      gender: UserGendersEnum.MALE,
      password: 'test-password',
      username: 'bike_style',
      zip_code: '18000999',
      street: 'St test',
      number: '132',
      neighborhood: 'San Francisco',
      city: 'San Francisco',
      country: 'United States',
      state: 'California',
      phone: '+55',
    });

    const user = await authService.validateUser(
      'test@bikestyle.app',
      'test-password',
    );

    const { refresh_token: currentRefreshToken } = await createSession.execute(
      user,
    );

    const { access_token, refresh_token } = await refreshToken.execute(
      currentRefreshToken,
    );

    expect(access_token).toBeTruthy();
    expect(refresh_token).toBeTruthy();
  });

  it('should be able to refresh a token that do not exists', async () => {
    const usersTokensRepository = new InMemoryUsersTokensRepository();
    const usersRepository = new InMemoryUsersRepository();
    const jwtService = new JwtService();
    const dateProvider = new DayjsDateProvider();

    const refreshToken = new RefreshToken(
      usersTokensRepository,
      usersRepository,
      jwtService,
      dateProvider,
    );

    await expect(refreshToken.execute('random token')).rejects.toThrowError();
  });
});
