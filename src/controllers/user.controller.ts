import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO, LoginUserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(@Body() user: CreateUserDTO): Promise<User> {
    return this.userService.createUser(user);
  }

  @Post('/login')
  loginUser(@Body() user: LoginUserDTO): Promise<User> {
    return this.userService.login(user);
  }
}
