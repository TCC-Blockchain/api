import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UserToken } from '@modules/auth/entities/user-tokens';
import { UsersTokensRepository } from '@modules/auth/repositories/users-tokens-repository';
import { Injectable } from '@nestjs/common';
import { PrismaUserTokensMapper } from '../mappers/prisma-users-tokens-mapper';

@Injectable()
export class PrismaUsersTokensRepository implements UsersTokensRepository {
  constructor(private prisma: PrismaService) {}

  async create(userToken: UserToken): Promise<void> {
    const raw = PrismaUserTokensMapper.toPrisma(userToken);

    await this.prisma.userTokens.create({ data: raw });
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string,
  ): Promise<UserToken | null> {
    const rawUserToken = await this.prisma.userTokens.findFirst({
      where: {
        user_id: user_id,
        token: token,
      },
    });

    if (!rawUserToken) {
      return null;
    }

    const userToken = PrismaUserTokensMapper.toDomain(rawUserToken);

    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    await this.prisma.userTokens.delete({
      where: {
        id: id,
      },
    });
  }

  async findByRefreshToken(token: string): Promise<UserToken | null> {
    const rawUserToken = await this.prisma.userTokens.findFirst({
      where: {
        token,
      },
    });

    if (!rawUserToken) {
      return null;
    }

    const userToken = PrismaUserTokensMapper.toDomain(rawUserToken);

    return userToken;
  }

  async findByCodeAndUserId(
    code: string,
    id: string,
  ): Promise<UserToken | null> {
    const raw = await this.prisma.userTokens.findFirst({
      where: {
        token: code,
        user_id: id,
      },
    });

    if (!raw) {
      return null;
    }

    const token = PrismaUserTokensMapper.toDomain(raw);

    return token;
  }
}
