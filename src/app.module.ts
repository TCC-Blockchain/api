import { Module } from '@nestjs/common';
import { ProvidersModule } from '@shared/providers/providers.module';

@Module({
  imports: [HttpModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
