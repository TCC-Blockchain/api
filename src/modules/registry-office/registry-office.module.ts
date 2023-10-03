import { DatabaseModule } from '@infra/database/database.module';
import { CreateRegistryOffice } from '@modules/registry-office/use-cases/create-registry-office';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { DeleteRegistryOffice } from './use-cases/delete-registry-office';
import { UpdateRegistryOffice } from './use-cases/update-registry-office';
import { GetRegistryOfficeById } from './use-cases/get-registry-office-by-id';
import { GetRegistryOfficeByName } from './use-cases/get-registry-office-by-name';

@Module({
    imports: [DatabaseModule, ProvidersModule],
    providers: [CreateRegistryOffice, DeleteRegistryOffice, UpdateRegistryOffice, GetRegistryOfficeById, GetRegistryOfficeByName],
    exports: [CreateRegistryOffice, DeleteRegistryOffice, UpdateRegistryOffice, GetRegistryOfficeById, GetRegistryOfficeByName],
})
export class RegistryOfficeModule {}
