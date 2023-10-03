import { RegistryOffice } from '@modules/registry-office/entities/registry-office';
import { RegistryOfficesRepository } from '@modules/registry-office/repositories/registry-offices-repository';
import { PrismaService } from '@shared/infra/database/prisma/prisma.service';
import { PrismaRegistryOfficeMapper } from '../mappers/prisma-registry-offices-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRegistryOfficesRepository
  implements RegistryOfficesRepository
{
  constructor(private prisma: PrismaService) {}

  async create(registry_office: RegistryOffice): Promise<void> {
    const mappedRegistryOffice =
      PrismaRegistryOfficeMapper.toPrisma(registry_office);

    await this.prisma.registryOffice.create({
      data: mappedRegistryOffice,
    });
  }

  async findRegistryOfficeById(id: string): Promise<RegistryOffice | null> {
    const rawRegistryOffice = await this.prisma.registryOffice.findUnique({
      where: {
        id,
      },
    });

    if (!rawRegistryOffice) {
      return null;
    }

    const registry_office = PrismaRegistryOfficeMapper.toDomain({
      raw: rawRegistryOffice,
    });

    return registry_office;
  }

  async findRegistryOfficeByName(name: string): Promise<RegistryOffice | null> {
    const rawRegistryOffice = await this.prisma.registryOffice.findFirst({
      where: {
        name,
      },
    });

    if (!rawRegistryOffice) {
      return null;
    }

    const registry_office = PrismaRegistryOfficeMapper.toDomain({
      raw: rawRegistryOffice,
    });

    return registry_office;
  }

  async deleteRegistryOffice(id: string): Promise<RegistryOffice | null> {
    const deleteRegistryOffice = await this.prisma.registryOffice.delete({
      where: {
        id,
      },
    });

    if (!deleteRegistryOffice) {
      return null;
    }

    const registry_office = PrismaRegistryOfficeMapper.toDomain({
      raw: deleteRegistryOffice,
    });

    return registry_office;
  }

  async updateRegistryOffice(id: string, name: string, logo: string, description: string, address_id: string | undefined, document: string, phone: string): Promise<RegistryOffice | null> {
      const updateRegistryOffice = await this.prisma.registryOffice.update({
        where: {
          id,
        },
        data: {
          name,
          logo,
          description,
          address_id,
          document,
          phone
        }
      });

      if (!updateRegistryOffice) {
        return null;
      }

      const registry_office = PrismaRegistryOfficeMapper.toDomain({
        raw: updateRegistryOffice,
      });

      return registry_office;
  }
}
