import { HttpException, HttpStatus } from '@nestjs/common';

export class DocumentNotFound extends HttpException {
  constructor() {
    super('Document  not found.', HttpStatus.NOT_FOUND);
  }
}
