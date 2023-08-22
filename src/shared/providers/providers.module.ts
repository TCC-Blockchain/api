/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { DateProvider } from './DateProvider/date-provider';
import { DayjsDateProvider } from './DateProvider/implementations/dayjs-date-provider';
import { HashProvider } from './HashProvider/hash-provider';
import { BCryptHashProvider } from './HashProvider/implementations/bcrypt-hash-provider';

@Module({
  imports: [],
  providers: [
    {
      provide: HashProvider,
      useClass: BCryptHashProvider,
    },
    {
      provide: DateProvider,
      useClass: DayjsDateProvider,
    },
  ],
  exports: [HashProvider, DateProvider],
})
export class ProvidersModule {}
