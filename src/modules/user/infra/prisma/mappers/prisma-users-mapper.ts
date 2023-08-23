import { User } from '@modules/user/entities/users';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      password: user.password,
      username: user.username,
      created_at: user.created_at,
    };
  }

  static toDomain({ raw }: { raw: RawUser }): User {
    return new User(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        username: raw.username,
        created_at: raw.created_at,
        phone: raw.phone,
        updated_at: raw.updated_at,
        document: raw.document,
        registry_office_id: raw.registry_office_id,
      },
      raw.id,
    );
  }
}
