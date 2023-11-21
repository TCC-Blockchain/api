import { User } from '@modules/user/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      coins_amount: user.coins_amount,
      phone: user.phone,
      document: user.document,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
