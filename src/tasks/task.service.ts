import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { User } from 'src/users/user.entity';
import { AuthService } from 'src/infrastructure/auth/auth.service';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly authService: AuthService,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, token: string): Promise<Task> {
    const user: User = await this.authService.getUserByToken(token);
    const task: Task = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: 'open',
      priority: createTaskDto.priority,
      created_at: new Date(),
      updated_at: new Date(),
      user: user,
    };
    return this.taskRepository.create(task);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    token: string,
  ): Promise<Task> {
    const user: User = await this.authService.getUserByToken(token);
    const task: Task | null = await this.taskRepository.findOneToEdit(id);
    if (!task) throw new NotFoundException('Task not founded');
    if (task.user.id !== user.id) {
      throw new UnauthorizedException('You are not the owner of this task');
    }

    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }
    if (updateTaskDto.priority) {
      task.priority = updateTaskDto.priority;
    }
    if (updateTaskDto.status) {
      task.status = updateTaskDto.status;
    }

    task.updated_at = new Date();
    const newTask: Task | null = await this.taskRepository.update(id, task);
    if (!newTask) throw new BadRequestException('Something went wrong');
    return newTask;
  }

  async updateTaskStatus(
    id: number,
    status: string,
    token: string,
  ): Promise<Task> {
    const user: User = await this.authService.getUserByToken(token);
    const taskOwner: number | null =
      await this.taskRepository.findTaskOwner(id);

    if (!taskOwner) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    if (taskOwner !== user.id) {
      throw new UnauthorizedException('You are not the owner of this task');
    }

    const task = await this.getTaskById(id);
    if (status != 'open' && status != 'in_progress' && status != 'done') {
      throw new BadRequestException('Invalid status');
    }
    task.status = status;
    task.updated_at = new Date();
    await this.taskRepository.update(id, task);
    return task;
  }

  async archiveTask(id: number, token: string): Promise<any> {
    const user: User = await this.authService.getUserByToken(token);
    const taskOwner: number | null =
      await this.taskRepository.findTaskOwner(id);

    if (!taskOwner) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    if (taskOwner !== user.id) {
      throw new UnauthorizedException('You are not the owner of this task');
    }

    const task = await this.getTaskById(id);
    task.status = 'archived';
    task.updated_at = new Date();
    await this.taskRepository.update(id, task);
    return { statusCode: 200, message: 'Your task was archived successfully' };
  }
}
