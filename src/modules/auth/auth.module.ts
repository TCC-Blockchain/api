import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { ProvidersModule } from 'src/shared/providers/providers.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CreateSession } from './use-cases/create-session';
import { RefreshToken } from './use-cases/refresh-token';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    ProvidersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    RefreshToken,
    CreateSession,
  ],
  exports: [AuthService, JwtService, RefreshToken, CreateSession],
})
export class AuthModule {}
