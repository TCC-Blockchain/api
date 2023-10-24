import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '../../providers/providers.module';
import { DatabaseModule } from '../database/database.module';
import { SessionsController } from './controllers/sessions.controller';
import { UsersController } from './controllers/users.controller';
import { RegistryOfficesController } from './controllers/registry-offices.controller';
import { RegistryOfficeModule } from '@modules/registry-office/registry-office.module';

@Module({
  imports: [
    DatabaseModule,
    ProvidersModule,
    UserModule,
    AuthModule,
    RegistryOfficeModule,
  ],
  controllers: [UsersController, SessionsController, RegistryOfficesController],
})
export class HttpModule {}
