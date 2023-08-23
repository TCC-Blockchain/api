import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameAlreadyTaken extends HttpException {
  constructor() {
    super('Username already taken', HttpStatus.BAD_REQUEST);
  }
}
