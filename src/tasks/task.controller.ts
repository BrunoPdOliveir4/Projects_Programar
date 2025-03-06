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
  Delete,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateTaskDto,
  })
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

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Headers('authorization') authorization: string,
  ) {
    if (!id || id === undefined)
      throw new BadRequestException('The ID must be informed on path');
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

  @Delete(':id')
  @UseGuards(AuthGuard)
  archiveTasks(
    @Param('id') id: number,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization?.replace('Bearer ', '') || null;
    if (!token) throw new NotFoundException('Token not found');
    return this.taskService.archiveTask(id, token);
  }
}
