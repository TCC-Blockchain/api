import { HttpModule } from '@infra/http/http.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/infra/database/database.module';
import { ProvidersModule } from './shared/providers/providers.module';

@Module({
  imports: [HttpModule, DatabaseModule, ProvidersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
