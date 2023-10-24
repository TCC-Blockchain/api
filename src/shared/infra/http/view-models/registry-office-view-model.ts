import { RegistryOffice } from '@modules/registry-office/entities/registry-office';

export class RegistryOfficeViewModel {
  static toHTTP(registry_office: RegistryOffice) {
    return {
      id: registry_office.id,
      name: registry_office.name,
      description: registry_office.description,
      logo: registry_office.logo,
      address_id: registry_office.address_id,
      document: registry_office.document,
      phone: registry_office.phone,
      created_at: registry_office.created_at,
      updated_at: registry_office.updated_at,
    };
  }
}
