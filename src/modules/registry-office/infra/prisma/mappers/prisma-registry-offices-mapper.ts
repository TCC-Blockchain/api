import { RegistryOffice } from '@modules/registry-office/entities/registry-office';
import { RegistryOffice as RawRegistryOffice } from '@prisma/client';

export class PrismaRegistryOfficeMapper {
  static toPrisma(registry_office: RegistryOffice) {
    return {
      id: registry_office.id,
      name: registry_office.name,
      logo: registry_office.logo,
      description: registry_office.description,
      address_id: registry_office.address_id,
      document: registry_office.document,
      phone: registry_office.phone,
      created_at: registry_office.created_at,
      updated_at: registry_office.updated_at,
    };
  }

  static toDomain({ raw }: { raw: RawRegistryOffice }): RegistryOffice {
    return new RegistryOffice(
      {
        name: raw.name,
        logo: raw.logo,
        description: raw.description,
        address_id: raw.address_id || undefined,
        document: raw.document,
        phone: raw.phone,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
