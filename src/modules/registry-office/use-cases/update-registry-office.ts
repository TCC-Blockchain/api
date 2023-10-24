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
         address_id,
         document,
         phone,
         created_at,
         updated_at } = request;


      const registry_office = new RegistryOffice({
        name,
        logo,
        description,
        address_id,
        document,
        phone,
        created_at,
        updated_at,
      });

      await this.registryOfficesRepository.updateRegistryOffice(registry_office);


    if (!registry_office) {
      throw new RegistryOfficeNotFound();
    }

    return {
      registry_office,
    };
  }
}
