import { Injectable } from '@nestjs/common';
import { RegistryOffice } from '../entities/registry-office';
import { RegistryOfficesRepository } from '../repositories/registry-offices-repository';
import { RegistryOfficeNotFound } from './errors/registry-office-not-found';

interface GetRegistryOfficesRequest {}

interface GetRegistryOfficesResponse {
  registry_offices: RegistryOffice[];
}

@Injectable()
export class GetRegistryOffices {

  constructor(private registryOfficesRepository: RegistryOfficesRepository) {}

  async execute(
    request: GetRegistryOfficesRequest,
  ): Promise<GetRegistryOfficesResponse> {

    const registry_offices =
      await this.registryOfficesRepository.findRegistryOffices();

    if (!registry_offices) {
      throw new RegistryOfficeNotFound();
    }

    return {
      registry_offices,
    };
  }
}
