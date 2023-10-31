import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy {
  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
