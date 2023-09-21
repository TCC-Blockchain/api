import { Injectable } from "@nestjs/common";
import { RegistryOffice } from "../entities/registry-office";
import { RegistryOfficesRepository } from "../repositories/registry-offices-repository";
import { RegistryOfficeAlreadyExists } from "./errors/registry-office-already-exists";

interface CreateRegistryOfficeRequest {
    name: string;
    description: string;
    address_id: string;
    document: string;
    phone: string;
}

interface CreateRegistryOfficeResponse {
    registry_office: RegistryOffice;
}

@Injectable()
export class CreateRegistryOffice {
    constructor(
        private registryOfficesRepository: RegistryOfficesRepository,
    ){}

    async execute(request: CreateRegistryOfficeRequest): Promise<CreateRegistryOfficeResponse> {
        const {
            name,
            description,
            address_id,
            document,
            phone,
        } = request;

        const alreadyExists = await this.registryOfficesRepository.findRegistryOfficeByName(name);

        if(alreadyExists) {
            throw new RegistryOfficeAlreadyExists;
        }

        const registry_office = new RegistryOffice({
            name,
            description,
            address_id,
            document,
            phone,
        })

        await this.registryOfficesRepository.create(registry_office);

        return{
            registry_office,
        };
    }
}