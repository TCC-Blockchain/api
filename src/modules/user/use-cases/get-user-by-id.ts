import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { UserNotFound } from './errors/user-not-found';

interface GetUserByIdRequest {
    id: string;
}

interface GetUserByIdResponse {
    user: User;
}

@Injectable()
export class GetUserById {
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
        const {
            id,
        } = request


        const user = await this.usersRepository.findById(id);

        if(!user){
            throw new UserNotFound();
        }

        return {
            user,
        };
    }

}