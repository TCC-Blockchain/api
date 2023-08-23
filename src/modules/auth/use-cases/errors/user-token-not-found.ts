import { HttpException, HttpStatus } from '@nestjs/common';

export class UserTokenNotFound extends HttpException {
  constructor() {
    super('User refresh token not found.', HttpStatus.NOT_FOUND);
  }
}
