import { Injectable } from '@nestjs/common';
import { RegistryOffice } from '../entities/registry-office';
import { RegistryOfficesRepository } from '../repositories/registry-offices-repository';
import { RegistryOfficeNotFound } from './errors/registry-office-not-found';
import { Address } from '../entities/address';

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
}

interface UpdateRegistryOfficeResponse {
  registry_office: RegistryOffice;
}

@Injectable()
export class UpdateRegistryOffice {
  constructor(private registryOfficesRepository: RegistryOfficesRepository) {}

  async execute({
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
  }: UpdateRegistryOfficeRequest): Promise<UpdateRegistryOfficeResponse> {
    const registryOffice =
      await this.registryOfficesRepository.findRegistryOfficeById(id);

    if (!registryOffice) {
      throw new RegistryOfficeNotFound();
    }

    const address = new Address(
      { street, number, neighborhood, state, country, postal_code },
      registryOffice?.address_id,
    );

    registryOffice.name = name;
    registryOffice.logo = logo;
    registryOffice.description = description;
    registryOffice.document = document;
    registryOffice.phone = phone;
    registryOffice.updateAddress(address);

    await this.registryOfficesRepository.updateRegistryOffice(registryOffice);

    return {
      registry_office: registryOffice,
    };
  }
}
