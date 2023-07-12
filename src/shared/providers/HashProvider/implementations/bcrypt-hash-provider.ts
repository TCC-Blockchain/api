import { HashProvider } from '../hash-provider';
import { compare, hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BCryptHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return await hash(payload, 10);
  }
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}
