import { Module } from '@nestjs/common';
import { ProvidersModule } from '@shared/providers/providers.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  controllers: [],
})
export class HttpModule {}
