import { Injectable } from '@nestjs/common';
import { HashProvider } from '@providers/HashProvider/hash-provider';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExists } from './errors/user-already-exists';

interface CreateUserRequest {
  name: string;
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
    const { document, email, name, phone, username, registry_office_id } =
      request;

    const alreadyExists = await this.usersRepository.findUserByEmail(email);

    if (alreadyExists) {
      throw new UserAlreadyExists();
    }

    const user = new User({
      username,
      name,
      email,
      phone,
      document,
      registry_office_id,
      coins_amount: 10,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
