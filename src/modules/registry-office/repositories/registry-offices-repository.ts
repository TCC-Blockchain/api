import { RegistryOffice } from '../entities/registry-office';

export abstract class RegistryOfficesRepository {
  abstract create(registry_office: RegistryOffice): Promise<void>;
  abstract findRegistryOfficeById(id: string): Promise<RegistryOffice | null>;
  abstract findRegistryOfficeByName(
    name: string,
  ): Promise<RegistryOffice | null>;
  abstract deleteRegistryOffice(id: string): Promise<RegistryOffice | null>;
  abstract updateRegistryOffice(
    id: string,
    name: string,
    logo: string,
    description: string,
    address_id: string | undefined,
    document: string,
    phone: string,
  ): Promise<RegistryOffice | null>;
}
