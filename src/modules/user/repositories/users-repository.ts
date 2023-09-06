import { User } from '../entities/users';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
