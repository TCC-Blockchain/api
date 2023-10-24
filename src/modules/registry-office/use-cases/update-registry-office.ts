import { Injectable } from '@nestjs/common';
import { RegistryOffice } from '../entities/registry-office';
import { RegistryOfficesRepository } from '../repositories/registry-offices-repository';
import { RegistryOfficeNotFound } from './errors/registry-office-not-found';

interface UpdateRegistryOfficeRequest {
  id: string;
  name: string;
  logo: string;
  description: string;
  address_id?: string;
  document: string;
  phone: string;
}

interface UpdateRegistryOfficeResponse {
  registry_office: RegistryOffice;
}

@Injectable()
export class UpdateRegistryOffice {
  constructor(private registryOfficesRepository: RegistryOfficesRepository) {}

  async execute(
    request: UpdateRegistryOfficeRequest,
  ): Promise<UpdateRegistryOfficeResponse> {
    const { id, name, logo, description, address_id, document, phone } =
      request;

    const registry_office =
      await this.registryOfficesRepository.updateRegistryOffice(
        id,
        name,
        logo,
        description,
        address_id,
        document,
        phone,
      );

    if (!registry_office) {
      throw new RegistryOfficeNotFound();
    }

    return {
      registry_office,
    };
  }
}
