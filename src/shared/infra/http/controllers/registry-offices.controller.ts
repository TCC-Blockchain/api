import { CreateRegistryOffice } from '@modules/registry-office/use-cases/create-registry-office';
import { DeleteRegistryOffice } from '@modules/registry-office/use-cases/delete-registry-office';
import { GetRegistryOfficeById } from '@modules/registry-office/use-cases/get-registry-office-by-id';
import { GetRegistryOfficeByName } from '@modules/registry-office/use-cases/get-registry-office-by-name';
import { UpdateRegistryOffice } from '@modules/registry-office/use-cases/update-registry-office';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public } from '@shared/utils/public-decorator';
import { CreateRegistryOfficeBody } from '../dtos/create-registry-office-body';
import { UpdateRegistryOfficeBody } from '../dtos/update-registry-office-body';
import { RegistryOfficeViewModel } from '../view-models/registry-office-view-model';
import { GetRegistryOffices } from '@modules/registry-office/use-cases/get-registry-offices';

@Controller('registry-offices')
export class RegistryOfficesController {
  constructor(
    private createRegistryOffice: CreateRegistryOffice,
    private getRegistryOfficeById: GetRegistryOfficeById,
    private getRegistryOfficeByName: GetRegistryOfficeByName,
    private getRegistryOffices: GetRegistryOffices,
    private deleteRegistryOffice: DeleteRegistryOffice,
    private updateRegistryOffice: UpdateRegistryOffice,
  ) {}

  @Post()
  @Public()
  async create(@Body() body: CreateRegistryOfficeBody) {
    const { name, description, logo, address_id, document, phone } = body;

    const { registry_office } = await this.createRegistryOffice.execute({
      name,
      logo,
      description,
      address_id,
      document,
      phone,
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }
  @Get('/list/')
  async GetRegistryOffices() {
    const { registry_offices } = await this.getRegistryOffices.execute();

    return {
      registry_offices: registry_offices.map((registryOffice) =>
        RegistryOfficeViewModel.toHTTP(registryOffice),
      ),
    };
  }

  @Get('/')
  async GetRegistryOfficeName(@Query('name') name: string) {
    const { registry_office } = await this.getRegistryOfficeByName.execute({
      name,
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }

  @Get('/:id')
  async GetRegistryOfficeId(@Param('id') id: string) {
    const { registry_office } = await this.getRegistryOfficeById.execute({
      id,
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }

  @Delete()
  async DeleteRegistryOffice(@Param('id') id: string) {
    const { registry_office } = await this.deleteRegistryOffice.execute({
      id,
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }

  @Put()
  async UpdateRegistryOffice(
    @Param('id') id: string,
    @Body() body: UpdateRegistryOfficeBody,
  ) {
    const {
      name,
      description,
      logo,
      street,
      number,
      neighborhood,
      state,
      country,
      postal_code,
      document,
      phone,
    } = body;

    const { registry_office } = await this.updateRegistryOffice.execute({
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
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }
}
