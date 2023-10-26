import { Injectable } from '@nestjs/common';
import { RegistryOffice } from '../entities/registry-office';
import { RegistryOfficesRepository } from '../repositories/registry-offices-repository';
import { RegistryOfficeNotFound } from './errors/registry-office-not-found';

interface GetRegistryOfficeByIdRequest {
  id: string;
}

interface GetRegistryOfficeByIdResponse {
  registry_office: RegistryOffice;
}

@Injectable()
export class GetRegistryOfficeById {

  constructor(private registryOfficesRepository: RegistryOfficesRepository) {}

  async execute(
    request: GetRegistryOfficeByIdRequest,
  ): Promise<GetRegistryOfficeByIdResponse> {
    const { id } = request;

    const registry_office =
      await this.registryOfficesRepository.findRegistryOfficeById(id);

    if (!registry_office) {
      throw new RegistryOfficeNotFound();
    }

    return {
      registry_office,
    };
  }
}
