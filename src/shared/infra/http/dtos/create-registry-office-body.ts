import { IsNotEmpty } from 'class-validator';

export class CreateRegistryOfficeBody{

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

    @IsNotEmpty()
    created_at: Date;

    @IsNotEmpty()
    updated_at: Date;
}
