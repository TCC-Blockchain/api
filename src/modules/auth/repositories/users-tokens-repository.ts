import { UserToken } from '../entities/users-tokens';

export abstract class UsersTokensRepository {
  abstract create(userToken: UserToken): Promise<void>;
  abstract findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | null>;
  abstract deleteById(id: string): Promise<void>;
  abstract findByRefreshToken(refresh_token: string): Promise<UserToken | null>;
  abstract findByCodeAndUserId(
    code: string,
    id: string,
  ): Promise<UserToken | null>;
}
