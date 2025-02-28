import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
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
  findOne(@Param('id') id: number): Promise<User> {
    // Added @Param()
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    // Added @Body()
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User): Promise<User> {
    // Added @Param() and @Body()
    return this.userService.update(id, user);
  }

  @Get(':id/tasks')
  getUserTasks(@Param('id') id: number): Promise<User> {
    return this.userService.getUserTasks(id);
  }
}
