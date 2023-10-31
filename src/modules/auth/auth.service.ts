import { User } from '@modules/user/entities/user';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { UserNotFound } from '@modules/user/use-cases/errors/user-not-found';
import { Injectable } from '@nestjs/common';
import { HashProvider } from '@providers/HashProvider/hash-provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async validateUser(email: string): Promise<User> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
