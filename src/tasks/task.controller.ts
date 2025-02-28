import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Param,
  NotFoundException,
  UseGuards,
  Put,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization?.replace('Bearer ', '') || null;
    if (!token) throw new NotFoundException('Token not found');
    return this.taskService.createTask(createTaskDto, token);
  }

  @Get()
  findAll() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization?.replace('Bearer ', '') || null;
    if (!token) throw new NotFoundException('Token not found');
    return this.taskService.updateTask(id, updateTaskDto, token);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization?.replace('Bearer ', '') || null;
    if (!token) throw new NotFoundException('Token not found');
    return this.taskService.updateTaskStatus(id, status, token);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.taskService.remove(id);
  // }
}
