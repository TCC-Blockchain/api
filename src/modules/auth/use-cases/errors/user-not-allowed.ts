import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotAllowed extends HttpException {
  constructor() {
    super('User not allowed.', HttpStatus.UNAUTHORIZED);
  }
}
