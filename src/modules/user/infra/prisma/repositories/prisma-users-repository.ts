import { PrismaService } from '@infra/database/prisma/prisma.service';
import { User } from '@modules/user/entities/users';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  findUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
