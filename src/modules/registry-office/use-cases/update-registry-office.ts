import { Injectable } from '@nestjs/common';
import { RegistryOffice } from '../entities/registry-office';
import { RegistryOfficesRepository } from '../repositories/registry-offices-repository';
import { RegistryOfficeNotFound } from './errors/registry-office-not-found';

interface UpdateRegistryOfficeRequest {
  id: string;
  name: string;
  logo: string;
  description: string;
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  country: string;
  postal_code: string;
  document: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
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
    const {
      id,
      name,
      logo,
      description,
      street,
      number,
      neighborhood,
      state,
      country,
      postal_code,
      document,
      phone,
      created_at,
      updated_at,
    } = request;

    const registry_office =
      await this.registryOfficesRepository.findRegistryOfficeById(id);

    if (!registry_office) {
      throw new RegistryOfficeNotFound();
    } else {
      await this.registryOfficesRepository.updateRegistryOffice(
        registry_office,
      );
    }

    return {
      registry_office,
    };
  }
}
