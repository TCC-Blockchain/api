import { UserToken } from '@modules/auth/entities/user-tokens';
import { UserTokens as RawUserTokens } from '@prisma/client';

export class PrismaUserTokensMapper {
  static toPrisma(userToken: UserToken) {
    return {
      id: userToken.id,
      token: userToken.token,
      user_id: userToken.user_id,
      expires_at: userToken.expires_at,
      created_at: userToken.created_at,
      updated_at: userToken.updated_at,
    };
  }

  static toDomain(raw: RawUserTokens): UserToken {
    return new UserToken(
      {
        token: raw.token,
        user_id: raw?.user_id || '',
        expires_at: raw.expires_at,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
