import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.repo.find();
  }

  async findOneById(id: number): Promise<Task | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findOneToEdit(id: number): Promise<Task | null> {
    return await this.repo.findOne({ where: { id }, relations: ['user'] });
  }

  async findTaskOwner(id: number): Promise<number | null> {
    const task = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    return task ? task.user.id : null;
  }

  async findOneByTitle(title: string): Promise<Task | null> {
    return await this.repo.findOne({ where: { title } });
  }

  async create(task: Task): Promise<Task> {
    return await this.repo.save(task);
  }

  async update(id: number, updatedTask: Partial<Task>): Promise<Task | null> {
    await this.repo.update(id, updatedTask);
    return await this.findOneById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
