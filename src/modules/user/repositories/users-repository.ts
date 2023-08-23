import { User } from '../entities/users';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
}
