import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { CreateUser } from './use-cases/create-user';
import { GetUserByEmail } from './use-cases/get-user-by-email';
import { GetUserById } from './use-cases/get-user-by-id';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  providers: [CreateUser, GetUserByEmail, GetUserById],
  exports: [CreateUser, GetUserByEmail, GetUserById],
})
export class UserModule {}
