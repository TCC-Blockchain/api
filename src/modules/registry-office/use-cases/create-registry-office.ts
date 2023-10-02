import { Injectable } from "@nestjs/common";
import { RegistryOffice } from "../entities/registry-office";
import { RegistryOfficesRepository } from "../repositories/registry-offices-repository";
import { RegistryOfficeAlreadyExists } from "./errors/registry-office-already-exists";

interface CreateRegistryOfficeRequest {
    name: string;
    description: string;
    logo: string;
    address_id: string;
    document: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
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
            logo,
            description,
            address_id,
            document,
            phone,
            created_at,
            updated_at,
        } = request;

        const alreadyExists = await this.registryOfficesRepository.findRegistryOfficeByName(name);

        if(alreadyExists) {
            throw new RegistryOfficeAlreadyExists;
        }

        const registry_office = new RegistryOffice({
            name,
            logo,
            description,
            address_id,
            document,
            phone,
            created_at,
            updated_at,
        })

        await this.registryOfficesRepository.create(registry_office);

        return{
            registry_office,
        };
    }
}