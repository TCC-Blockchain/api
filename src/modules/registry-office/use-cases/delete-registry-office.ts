import { Injectable } from '@nestjs/common';
import { RegistryOffice } from '../entities/registry-office';
import { RegistryOfficesRepository } from '../repositories/registry-offices-repository';
import { RegistryOfficeNotFound } from './errors/registry-office-not-found';

interface DeleteRegistryOfficeRequest {
  id: string;
}

interface DeleteRegistryOfficeResponse {
  registry_office: RegistryOffice;
}

@Injectable()
export class DeleteRegistryOffice {
  constructor(private registryOfficesRepository: RegistryOfficesRepository) {}

  async execute(
    request: DeleteRegistryOfficeRequest,
  ): Promise<DeleteRegistryOfficeResponse> {
    const { id } = request;

    const registry_office =
      await this.registryOfficesRepository.findRegistryOfficeById(id);

    if (!registry_office) {
      throw new RegistryOfficeNotFound();
    } else {
      await this.registryOfficesRepository.deleteRegistryOffice(id);
    }

    return {
      registry_office,
    };
  }
}
