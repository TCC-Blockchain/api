import { PrismaUsersTokensRepository } from '@modules/auth/infra/prisma/repositories/prisma-users-tokens-repository';
import { UsersTokensRepository } from '@modules/auth/repositories/users-tokens-repository';
import { PrismaUsersRepository } from '@modules/user/infra/prisma/repositories/prisma-users-repository';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UsersTokensRepository,
      useClass: PrismaUsersTokensRepository,
    },
  ],
  exports: [UsersRepository, UsersTokensRepository],
})
export class DatabaseModule {}
