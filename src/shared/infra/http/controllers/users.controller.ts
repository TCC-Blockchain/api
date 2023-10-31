import { CreateUser } from '@modules/user/use-cases/create-user';
import { GetUserByEmail } from '@modules/user/use-cases/get-user-by-email';
import { GetUserById } from '@modules/user/use-cases/get-user-by-id';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from '@shared/utils/public-decorator';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private getUserByEmail: GetUserByEmail,
    private getUserById: GetUserById,
  ) {}

  @Post()
  @Public()
  async create(@Body() { data }: CreateUserBody) {
    const { user } = await this.createUser.execute({
      username: data.username || '',
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
      phone: '',
      document: '',
      registry_office_id: data.unsafe_metadata.registry_office_id,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Get('/')
  async getUserEmail(@Query('email') email: string) {
    const { user } = await this.getUserByEmail.execute({ email });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Get('/:id')
  async getUserId(@Param('id') id: string) {
    const { user } = await this.getUserById.execute({ id });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}
