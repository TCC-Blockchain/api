import { Injectable } from '@nestjs/common';
import { HashProvider } from '@providers/HashProvider/hash-provider';
import { User } from '../entities/users';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExists } from './errors/user-already-exists';

interface CreateUserRequest {
  name: string;
  password: string;
  username: string;
  email: string;
  document: string;
  phone: string;
  registry_office_id: string;
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
      registry_office_id,
    } = request;

    const alreadyExists = await this.usersRepository.findUserByEmail(email);

    if (alreadyExists) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = new User({
      username,
      name,
      email,
      password: hashedPassword,
      phone,
      document,
      registry_office_id,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
