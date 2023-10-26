import { DatabaseModule } from '@infra/database/database.module';
import { CreateRegistryOffice } from '@modules/registry-office/use-cases/create-registry-office';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { DeleteRegistryOffice } from './use-cases/delete-registry-office';
import { GetRegistryOfficeById } from './use-cases/get-registry-office-by-id';
import { GetRegistryOfficeByName } from './use-cases/get-registry-office-by-name';
import { UpdateRegistryOffice } from './use-cases/update-registry-office';
import { GetRegistryOffices } from './use-cases/get-registry-offices';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  providers: [
    CreateRegistryOffice,
    DeleteRegistryOffice,
    UpdateRegistryOffice,
    GetRegistryOfficeById,
    GetRegistryOfficeByName,
    GetRegistryOffices,
  ],
  exports: [
    CreateRegistryOffice,
    DeleteRegistryOffice,
    UpdateRegistryOffice,
    GetRegistryOfficeById,
    GetRegistryOfficeByName,
    GetRegistryOffices,
  ],
})
export class RegistryOfficeModule {}
