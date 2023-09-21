import { Injectable } from "@nestjs/common";
import { RegistryOffice } from "../entities/registry-office";
import { RegistryOfficesRepository } from "../repositories/registry-offices-repository";
import { RegistryOfficeNotFound } from "./errors/registry-office-not-found";

interface GetRegistryOfficeByNameRequest {
    name: string;
}

interface GetRegistryOfficeByNameResponse {
    registry_office: RegistryOffice;
}

@Injectable()
export class GetRegistryOfficeByName{
    constructor(
        private registryOfficesRepository: RegistryOfficesRepository,
    ) {}

    async execute(request: GetRegistryOfficeByNameRequest): Promise<GetRegistryOfficeByNameResponse> {
        const {
            name,
        } = request;

        const registry_office = await this.registryOfficesRepository.findRegistryOfficeByName(name);

        if(!registry_office) {
            throw new RegistryOfficeNotFound();
        }

        return {
            registry_office,
        };
    }

}