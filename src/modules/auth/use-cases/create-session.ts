import { User } from '@modules/user/entities/user';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateProvider } from '@providers/DateProvider/date-provider';
import { jwtConstants } from '../constants';
import { UserToken } from '../entities/user-tokens';
import { UsersTokensRepository } from '../repositories/users-tokens-repository';
import { UserNotFound } from './errors/user-not-found';

interface CreateSessionResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

@Injectable()
export class CreateSession {
  constructor(
    private usersTokensRepository: UsersTokensRepository,
    private jwtService: JwtService,
    private dateProvider: DateProvider,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request_user: User): Promise<CreateSessionResponse> {
    const refreshToken = this.jwtService.sign(
      {
        username: request_user.username,
        email: request_user.email,
        sub: request_user.id,
      },
      {
        secret: jwtConstants.secret_refresh_token,
        expiresIn: jwtConstants.expires_in_refresh_token,
      },
    );

    const refreshTokenExpiresAt = this.dateProvider.addDays(
      jwtConstants.expires_refresh_token_days,
    );

    const userToken = new UserToken({
      expires_at: refreshTokenExpiresAt,
      token: refreshToken,
      user_id: request_user.id,
    });

    await this.usersTokensRepository.create(userToken);

    const accessToken = this.jwtService.sign(
      {
        username: request_user.username,
        email: request_user.email,
        sub: request_user.id,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expires_in_token,
      },
    );

    const user = await this.usersRepository.findById(request_user.id);

    if (!user) {
      throw new UserNotFound();
    }

    return { access_token: accessToken, refresh_token: refreshToken, user };
  }
}
