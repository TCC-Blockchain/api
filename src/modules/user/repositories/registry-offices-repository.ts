import { RegistryOffice } from "../entities/registry-office";

export abstract class RegistryOfficesRepository {
    abstract create(registry_office: RegistryOffice): Promise<void>;
    abstract findRegistryOfficeById(id: string): Promise<RegistryOffice | null>;
    abstract findRegistryOfficeByName(name: string): Promise<RegistryOffice | null>;
}