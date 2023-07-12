/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { BCryptHashProvider } from './HashProvider/implementations/bcrypt-hash-provider';
import { HashProvider } from './HashProvider/hash-provider';
import { DateProvider } from './DateProvider/date-provider';
import { DayjsDateProvider } from './DateProvider/implementations/dayjs-date-provider';

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
