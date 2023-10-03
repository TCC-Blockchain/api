import { IsNotEmpty } from "class-validator";

export class UpdateRegistryOfficeBody {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  address_id: string;

  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  phone: string;

}
