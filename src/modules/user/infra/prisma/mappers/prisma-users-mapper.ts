import { User } from '@modules/user/entities/user';
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
      document: user.document,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static toDomain({ raw }: { raw: RawUser }): User {
    return new User(
      {
        email: raw.email,
        name: raw.name,
        username: raw.username,
        phone: raw.phone,
        document: raw.document,
        registry_office_id: raw.registry_office_id || undefined,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
        password: raw.password,
      },
      raw.id,
    );
  }
}
