import { CreateRegistryOffice } from "@modules/user/use-cases/create-registry-office";
import { GetRegistryOfficeById } from "@modules/user/use-cases/get-registry-office-by-id";
import { GetRegistryOfficeByName } from "@modules/user/use-cases/get-registry-office-by-name";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "@shared/utils/public-decorator";
import { RegistryOfficeViewModel } from "../view-models/registry-office-view-model";
import { CreateRegistryOfficeBody } from "../dtos/create-registry-office-body";

@Controller('registry-offices')
export class RegistryOfficesController {
    constructor(private createRegistryOffice: CreateRegistryOffice,
        private getRegistryOfficeById: GetRegistryOfficeById,
        private getRegistryOfficeByName: GetRegistryOfficeByName) {}
    
    @Post()
    @Public()
    async create(@Body() body: CreateRegistryOfficeBody) {
        const {
            name,
            description,
            address_id,
            document,
            phone,
        } = body;

        const { registry_office } = await this.createRegistryOffice.execute({
            name,
            description,
            address_id,
            document,
            phone,
        });

        return {
            registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
        };
    }

    @Get(':/id')
    @Public()
    async GetRegistryOfficeId(@Param('id') id) {

        const { registry_office } = await this.getRegistryOfficeById.execute({id});

        return {
            registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
        };
    }

    @Get(':/name')
    @Public()
    async GetRegistryOfficeName(@Param('name') name) {

        const{ registry_office } = await this.getRegistryOfficeByName.execute({name});

        return {
            registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
        };
    }

}