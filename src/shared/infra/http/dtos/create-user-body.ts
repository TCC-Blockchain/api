import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 40)
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  document: string;

  @IsNotEmpty()
  registry_office_id: string;
}
