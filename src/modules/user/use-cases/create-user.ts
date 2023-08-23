import { Injectable } from '@nestjs/common';
import { HashProvider } from '@providers/HashProvider/hash-provider';
import { Address } from '../entities/addresses';
import { User, UserGendersEnum } from '../entities/users';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExists } from './errors/user-already-exists';
import { UsernameAlreadyTaken } from './errors/username-already-taken';

interface CreateUserRequest {
  name: string;
  phone: string;
  description?: string;
  birth_date: string;
  gender: UserGendersEnum;
  email: string;
  username: string;
  image?: string;
  password: string;
  starred_photos?: string[];
  url?: string;
  formatted_address?: string;
  zip_code: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
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
      name,
      birth_date,
      gender,
      email,
      username,
      image,
      phone,
      password,
      zip_code,
      street,
      neighborhood,
      number,
      city,
      state,
      country,
      formatted_address,
      url,
      latitude,
      longitude,
      description,
      starred_photos,
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
      gender,
      birth_date: new Date(birth_date),
      image,
      phone,
      description,
      starred_photos: starred_photos || [],
      can_access_web: false,
    });

    const address = new Address({
      zip_code,
      street,
      number,
      city,
      state,
      country,
      user_id: user.id,
      neighborhood,
      formatted_address: formatted_address,
      url: url,
      latitude,
      longitude,
    });

    await this.usersRepository.create({ user, address });

    return {
      user,
    };
  }
}
