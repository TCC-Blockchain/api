import { IsNotEmpty } from 'class-validator';

export class CreateRegistryOfficeBody{
   
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    address_id: string;

    @IsNotEmpty()
    document: string;

    @IsNotEmpty()
    phone: string;
}