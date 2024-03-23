import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/repositories/user.repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: {
    username: string;
    password: string;
  }): Promise<User> {
    const foundUser = await this.userRepository.findUsername({
      username: user.username,
    });
    if (!foundUser) {
      return await this.userRepository.createUser({
        user: { ...user, point: 100 },
      });
    } else {
      throw new BadRequestException('username already registered');
    }
  }

  async login(user: { username: string; password: string }): Promise<User> {
    const correctUser = await this.userRepository.login({ user });
    if (correctUser) {
      return correctUser;
    } else {
      throw new BadRequestException('username or password wrong');
    }
  }
}
