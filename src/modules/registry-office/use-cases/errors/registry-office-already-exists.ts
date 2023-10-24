import { HttpException, HttpStatus } from '@nestjs/common';

export class RegistryOfficeAlreadyExists extends HttpException {
  constructor() {
    super('Registry office already exists', HttpStatus.BAD_REQUEST);
  }
}
