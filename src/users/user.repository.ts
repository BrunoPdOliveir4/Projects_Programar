import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findOneByUserName(username: string): Promise<User | null> {
    return await this.repo.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } });
  }

  async getUserTasks(id: number): Promise<User | null> {
    return await this.repo.findOne({ where: { id }, relations: ['tasks'] });
  }

  async create(user: User): Promise<User> {
    return await this.repo.save(user);
  }

  async update(id: number, updatedUser: Partial<User>): Promise<User | null> {
    await this.repo.update(id, updatedUser);
    return await this.findOneById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
