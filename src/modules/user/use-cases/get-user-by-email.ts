import { Injectable } from '@nestjs/common';
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { UserNotFound } from './errors/user-not-found';

interface GetUserByEmailRequest{
    email: string;
}

interface GetUserByEmailResponse{
    user: User;
}

@Injectable()
export class GetUserByEmail{
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute(request: GetUserByEmailRequest): Promise<GetUserByEmailResponse> {
        const{
            email,
        } = request;

        const user = await this.usersRepository.findUserByEmail(email);

        if(!user){
            throw new UserNotFound();
        }

        return {
            user,
        };


    }
}