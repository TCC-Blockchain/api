import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '../../providers/providers.module';
import { DatabaseModule } from '../database/database.module';
import { SessionsController } from './controllers/sessions.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule, ProvidersModule, UserModule, AuthModule],
  controllers: [UsersController, SessionsController],
})
export class HttpModule {}
