import { IsNotEmpty } from "class-validator";

export class UpdateRegistryOfficeBody {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  postal_code: string;

  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  created_at: Date;

  @IsNotEmpty()
  updated_at: Date;

}
