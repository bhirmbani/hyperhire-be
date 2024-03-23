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
    user: { username: string; password: string; point: number };
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

  async findByUserId(params: { userId: number }): Promise<User> {
    const { userId } = params;
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async updateUserPoint(params: {
    userId: number;
    point: number;
  }): Promise<User> {
    const { userId, point } = params;
    return this.prisma.user.update({
      data: {
        point,
      },
      where: {
        id: userId,
      },
    });
  }
}
