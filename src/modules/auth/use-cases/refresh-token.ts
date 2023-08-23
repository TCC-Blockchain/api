import { UsersRepository } from '@modules/user/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateProvider } from '@providers/DateProvider/date-provider';
import { jwtConstants } from '../constants';
import { UserToken } from '../entities/users-tokens';
import { UsersTokensRepository } from '../repositories/users-tokens-repository';
import { UserNotFound } from './errors/user-not-found';
import { UserTokenNotFound } from './errors/user-token-not-found';

interface PayloadData {
  sub: string;
  email: string;
}

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class RefreshToken {
  constructor(
    private usersTokensRepository: UsersTokensRepository,
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private dateProvider: DateProvider,
  ) {}

  async execute(token: string): Promise<RefreshTokenResponse> {
    const { sub } = this.jwtService.verify(token, {
      secret: jwtConstants.secret_refresh_token,
    }) as PayloadData;

    const user_id = sub;

    const currentUserToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!currentUserToken) {
      throw new UserTokenNotFound();
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new UserNotFound();
    }

    await this.usersTokensRepository.deleteById(currentUserToken.id);

    const refreshToken = this.jwtService.sign(
      { username: user.username, email: user.email, sub: user.id },
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
      user_id: user.id,
    });

    await this.usersTokensRepository.create(userToken);

    const accessToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
        sub: user.id,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expires_in_token,
      },
    );

    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
