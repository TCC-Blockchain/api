import { Injectable } from '@nestjs/common';
import { HashProvider } from '@providers/HashProvider/hash-provider';
import { Address } from '../entities/addresses';
import { User } from '../entities/users';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExists } from './errors/user-already-exists';
import { UsernameAlreadyTaken } from './errors/username-already-taken';

interface CreateUserRequest {
  name: string;
  password: string;
  username: string;
  email: string;
  document: string;
  phone: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const {
      document,
      email,
      name,
      password,
      phone,
      username,
    } = request;

    const alreadyExists = await this.usersRepository.findUserByEmail(email);

    if (alreadyExists) {
      throw new UserAlreadyExists();
    }

    const usernameAlreadyExists = await this.usersRepository.findByUsername(
      username,
    );

    if (usernameAlreadyExists) {
      throw new UsernameAlreadyTaken();
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = new User({
      username,
      name,
      email,
      password: hashedPassword,
      phone,
      document,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
