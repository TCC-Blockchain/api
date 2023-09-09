import { PrismaService } from '@infra/database/prisma/prisma.service';
import { User } from '@modules/user/entities/user';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-users-mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const mappedUser = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: mappedUser,
    });
  }

  async findById(id: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!rawUser) {
      return null;
    }

    const user = PrismaUserMapper.toDomain({
      raw: rawUser,
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!rawUser) {
      return null;
    }

    const user = PrismaUserMapper.toDomain({
      raw: rawUser,
    });

    return user;
  }
}
