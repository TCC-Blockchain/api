import { UsersRepository } from '@modules/user/repositories/users-repository';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DateProvider } from '@providers/DateProvider/date-provider';
import { UserToken } from '../entities/users-tokens';
import { UsersTokensRepository } from '../repositories/users-tokens-repository';

interface SendForgotPasswordCodeRequest {
  email: string;
}

@Injectable()
export class SendForgotPasswordCode {
  constructor(
    private usersRepository: UsersRepository,
    private dateProvider: DateProvider,
    private usersTokensRepository: UsersTokensRepository,
    private mailService: MailerService,
  ) {}

  async execute(request: SendForgotPasswordCodeRequest): Promise<void> {
    const { email } = request;

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const generatedCode = String(Math.floor(100000 + Math.random() * 900000));

    const tokenExpiresAt = this.dateProvider.addHours(2);

    const userToken = new UserToken({
      expires_at: tokenExpiresAt,
      token: generatedCode,
      user_id: user.id,
    });

    await this.usersTokensRepository.create(userToken);

    await this.mailService.sendMail({
      to: 'lecirics@gmail.com',
      subject: 'Código para recuperar a senha',
      text: `TESTE DE EMAIL ${generatedCode}`,
      html: `<h1>TESTE DE EMAIL ${generatedCode}</h1>`,
    });
  }
}
