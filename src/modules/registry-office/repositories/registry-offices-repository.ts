import { RegistryOffice } from '../entities/registry-office';

export abstract class RegistryOfficesRepository {
  abstract create(registry_office: RegistryOffice): Promise<void>;
  abstract findRegistryOfficeById(id: string): Promise<RegistryOffice | null>;
  abstract findRegistryOfficeByName(
    name: string,
  ): Promise<RegistryOffice | null>;
  abstract deleteRegistryOffice(id: string): Promise<RegistryOffice | null>;
  abstract updateRegistryOffice(registry_office: RegistryOffice): Promise<void>;
}
