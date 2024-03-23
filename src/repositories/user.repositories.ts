import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUsername(params: { username: string }): Promise<User> {
    const { username } = params;
    return this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async createUser(params: {
    user: { username: string; password: string };
  }): Promise<User> {
    const { user } = params;
    return this.prisma.user.create({ data: user });
  }

  async login(params: {
    user: { username: string; password: string };
  }): Promise<User> {
    const { user } = params;
    return this.prisma.user.findFirst({
      where: {
        username: user.username,
        AND: {
          password: user.password,
        },
      },
    });
  }
}
