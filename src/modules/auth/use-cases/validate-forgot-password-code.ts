import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DateProvider } from '@providers/DateProvider/date-provider';
import { UsersTokensRepository } from '../repositories/users-tokens-repository';

interface ValidateForgotPasswordCodeRequest {
  code: string;
}

@Injectable()
export class ValidateForgotPasswordCode {
  constructor(
    private dateProvider: DateProvider,
    private usersTokensRepository: UsersTokensRepository,
  ) {}

  async execute(request: ValidateForgotPasswordCodeRequest): Promise<void> {
    const { code } = request;

    const userCode = await this.usersTokensRepository.findByRefreshToken(code);

    if (!userCode) {
      throw new NotFoundException('Code not found');
    }

    const isValid = this.dateProvider.compareIfBefore(
      userCode.expires_at,
      new Date(),
    );

    if (isValid) {
      throw new UnauthorizedException('Code expired');
    }
  }
}
