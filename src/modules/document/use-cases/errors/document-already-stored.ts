import { HttpException, HttpStatus } from '@nestjs/common';

export class DocumentAlreadyStored extends HttpException {
  constructor() {
    super('Document already stored.', HttpStatus.CONFLICT);
  }
}
