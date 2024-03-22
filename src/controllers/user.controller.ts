import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/services/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(
    @Body() user: { username: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(user);
  }

  @Post('/login')
  loginUser(
    @Body() user: { username: string; password: string },
  ): Promise<User> {
    return this.userService.login(user);
  }
}
