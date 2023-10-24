import { HttpException, HttpStatus } from '@nestjs/common';

export class RegistryOfficeNotFound extends HttpException {
  constructor() {
    super('Registry office  not found.', HttpStatus.NOT_FOUND);
  }
}