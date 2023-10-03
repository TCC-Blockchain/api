import { CreateRegistryOffice } from '@modules/registry-office/use-cases/create-registry-office';
import { GetRegistryOfficeById } from '@modules/registry-office/use-cases/get-registry-office-by-id';
import { GetRegistryOfficeByName } from '@modules/registry-office/use-cases/get-registry-office-by-name';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from '@shared/utils/public-decorator';
import { RegistryOfficeViewModel } from '../view-models/registry-office-view-model';
import { CreateRegistryOfficeBody } from '../dtos/create-registry-office-body';
import { DeleteRegistryOffice } from '@modules/registry-office/use-cases/delete-registry-office';
import { UpdateRegistryOffice } from '@modules/registry-office/use-cases/update-registry-office';
import { UpdateRegistryOfficeBody } from '../dtos/update-registry-office-body';



@Controller('registry-offices')
export class RegistryOfficesController {
  constructor(
    private createRegistryOffice: CreateRegistryOffice,
    private getRegistryOfficeById: GetRegistryOfficeById,
    private getRegistryOfficeByName: GetRegistryOfficeByName,
    private deleteRegistryOffice: DeleteRegistryOffice,
    private updateRegistryOffice: UpdateRegistryOffice,
  ) {}

  @Post()
  @Public()
  async create(@Body() body: CreateRegistryOfficeBody) {
    const {
      name,
      description,
      logo,
      address_id,
      document,
      phone,
      created_at,
      updated_at,
    } = body;

    const { registry_office } = await this.createRegistryOffice.execute({
      name,
      logo,
      description,
      address_id,
      document,
      phone,
      created_at,
      updated_at,
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }

  @Get(':/id')
  @Public()
  async GetRegistryOfficeId(@Param('id') id) {
    const { registry_office } = await this.getRegistryOfficeById.execute({
      id,
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }

  @Get(':/name')
  @Public()
  async GetRegistryOfficeName(@Param('name') name) {
    const { registry_office } = await this.getRegistryOfficeByName.execute({
      name,
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }

  @Get(':/id')
  async DeleteRegistryOffice(@Param('id') id) {
    const { registry_office } = await this.deleteRegistryOffice.execute({
      id,
    });

    return {
      registry_office: RegistryOfficeViewModel.toHTTP(registry_office),
    };
  }

  @Put()
  async UpdateRegistryOffice(@Param('id') id, @Body() body: UpdateRegistryOfficeBody) {

    const {
      name,
      description,
      logo,
      address_id,
      document,
      phone,
    } = body;

    const { registry_office } = await this.updateRegistryOffice.execute({
      id,
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
}
