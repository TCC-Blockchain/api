import { PrismaUsersRepository } from '@modules/user/infra/prisma/repositories/prisma-users-repository';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegistryOfficesRepository } from '@modules/registry-office/repositories/registry-offices-repository';
import { PrismaRegistryOfficesRepository } from '@modules/registry-office/infra/prisma/repositories/prisma-registry-offices-repository';
import { DocumentsRepository } from '@modules/document/repositories/document-repository';
import { PrismaDocumentsRepository } from '@modules/document/infra/prisma/repositories/prisma-document-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: RegistryOfficesRepository,
      useClass: PrismaRegistryOfficesRepository,
    },
    {
      provide: DocumentsRepository,
      useClass: PrismaDocumentsRepository,
    },
  ],
  exports: [UsersRepository, RegistryOfficesRepository, DocumentsRepository],
})
export class DatabaseModule {}
