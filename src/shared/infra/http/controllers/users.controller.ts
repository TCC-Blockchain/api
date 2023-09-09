import { CreateUser } from '@modules/user/use-cases/create-user';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UsersController {
  constructor(private createUser: CreateUser) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const {
      username,
      name,
      email,
      password,
      phone,
      document,
      registry_office_id,
    } = body;

    const { user } = await this.createUser.execute({
      username,
      name,
      email,
      password,
      phone,
      document,
      registry_office_id,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}
