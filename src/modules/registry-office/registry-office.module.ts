import { DatabaseModule } from '@infra/database/database.module';
import { CreateRegistryOffice } from '@modules/registry-office/use-cases/create-registry-office';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';

@Module({
    imports: [DatabaseModule, ProvidersModule],
    providers: [CreateRegistryOffice],
    exports: [CreateRegistryOffice],
})
export class RegistryOfficeModule {}