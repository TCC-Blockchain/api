import { User } from '@modules/user/entities/user';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashProvider } from '@providers/HashProvider/hash-provider';
import { UserNotFound } from './use-cases/errors/user-not-found';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    const hasPasswordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!hasPasswordMatched) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
