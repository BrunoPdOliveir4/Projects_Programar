import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RegisterDto } from 'src/dto/register.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: RegisterDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Get(':id/tasks')
  getUserTasks(@Param('id') id: number): Promise<User> {
    return this.userService.getUserTasks(id);
  }

  @Post('tasks')
  getTasks(@Headers('authorization') authorization: string) {
    const token = authorization?.replace('Bearer ', '') || null;
    if (!token) throw new NotFoundException('Token not found');
    return this.userService.getMyTasks(token);
  }
}
