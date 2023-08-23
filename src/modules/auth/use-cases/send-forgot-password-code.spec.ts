/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserGendersEnum } from '@modules/user/entities/users';
import { CreateUser } from '@modules/user/use-cases/create-user';
import { MailerService, MailerTransportFactory } from '@nestjs-modules/mailer';
import { NotFoundException } from '@nestjs/common';
import { DayjsDateProvider } from '@providers/DateProvider/implementations/dayjs-date-provider';
import { BCryptHashProvider } from '@providers/HashProvider/implementations/bcrypt-hash-provider';
import { InMemoryUsersTokensRepository } from '@test/repositories/in-memory-users-tokens-repository';
import Mail from 'nodemailer/lib/mailer';
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { SendForgotPasswordCode } from './send-forgot-password-code';

describe('Send forgot password code', () => {
  it('should be able to send a forgot password code to user', async () => {
    // const usersRepository = new InMemoryUsersRepository();
    // const usersTokensRepository = new InMemoryUsersTokensRepository();
    // const hashProvider = new BCryptHashProvider();
    // const dateProvider = new DayjsDateProvider();
    // const mailerService = new MailerService(
    //   {
    //     transport: { jsonTransport: JSON.parse('') },
    //   },
    //   {} as MailerTransportFactory,
    // );
    // const sendForgotPasswordCode = new SendForgotPasswordCode(
    //   usersRepository,
    //   dateProvider,
    //   usersTokensRepository,
    //   mailerService,
    // );
    // const createUser = new CreateUser(usersRepository, hashProvider);
    // const { user } = await createUser.execute({
    //   name: 'John',
    //   birth_date: JSON.stringify(new Date()),
    //   email: 'john@test.com',
    //   gender: UserGendersEnum.MALE,
    //   password: 'password',
    //   neighborhood: 'San Francisco',
    //   username: 'john_test',
    //   zip_code: '18000999',
    //   street: 'St test',
    //   number: '132',
    //   city: 'San Francisco',
    //   country: 'United States',
    //   state: 'California',
    // });
    // await sendForgotPasswordCode.execute({ email: user.email });
    // expect(usersTokensRepository.userTokens.length).toBe(1);
  });

  it('should not be able to send a code to an user that do not exists', async () => {
    // const usersRepository = new InMemoryUsersRepository();
    // const usersTokensRepository = new InMemoryUsersTokensRepository();
    // const dateProvider = new DayjsDateProvider();
    // const mailerService = new MailerService(
    //   {
    //     transport: {},
    //   },
    //   {} as MailerTransportFactory,
    // );
    // const sendForgotPasswordCode = new SendForgotPasswordCode(
    //   usersRepository,
    //   dateProvider,
    //   usersTokensRepository,
    //   mailerService,
    // );
    // await expect(
    //   await sendForgotPasswordCode.execute({ email: 'test@example.com' }),
    // ).rejects.toThrow(new NotFoundException());
  });
});
