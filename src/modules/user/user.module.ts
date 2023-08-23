import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { CreateUser } from './use-cases/create-user';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  providers: [CreateUser],
  exports: [CreateUser],
})
export class UserModule {}
