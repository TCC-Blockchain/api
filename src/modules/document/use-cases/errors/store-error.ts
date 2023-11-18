import { HttpException, HttpStatus } from '@nestjs/common';

export class StoreError extends HttpException {
  constructor() {
    super(
      'Error while trying to store hash on blockchain.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
