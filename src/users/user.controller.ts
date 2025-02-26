import { Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(id: number, user: User): Promise<User> {
    return this.userService.update(id, user);
  }
}
