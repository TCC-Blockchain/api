import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { CreateUser } from './use-cases/create-user';
import { CreateRegistryOffice } from './use-cases/create-registry-office';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  providers: [CreateUser, CreateRegistryOffice],
  exports: [CreateUser, CreateRegistryOffice],
})
export class UserModule {}
