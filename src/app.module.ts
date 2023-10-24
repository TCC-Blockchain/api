import { HttpModule } from '@infra/http/http.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/infra/database/database.module';
import { ProvidersModule } from './shared/providers/providers.module';
import { RegistryOfficeModule } from '@modules/registry-office/registry-office.module';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    ProvidersModule,
    AuthModule,
    RegistryOfficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
