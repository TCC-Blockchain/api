import { LocalAuthGuard } from '@modules/auth/guards/local-auth.guard';
import { CreateSession } from '@modules/auth/use-cases/create-session';
import { RefreshToken } from '@modules/auth/use-cases/refresh-token';
import { User } from '@modules/user/entities/user';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from '@shared/utils/public-decorator';
import { RefreshTokenBody } from '../dtos/refresh-token-body';
import { UserViewModel } from '../view-models/user-view-model';

@Public()
@Controller('sessions')
export class SessionsController {
  constructor(
    private createSession: CreateSession,
    private refreshToken: RefreshToken,
  ) {}

  @Post('refresh-token')
  async refresh_token(@Body() body: RefreshTokenBody) {
    const { token } = body;

    const { access_token, refresh_token } = await this.refreshToken.execute(
      token,
    );

    return {
      access_token,
      refresh_token,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(@Request() request: { user: User }) {
    const { user: request_user } = request;

    const { access_token, refresh_token, user } =
      await this.createSession.execute(request_user);

    return {
      user: UserViewModel.toHTTP(user),
      access_token,
      refresh_token,
    };
  }

  @Get('me')
  getProfile(@Request() request: { user: User }) {
    return request.user;
  }
}
