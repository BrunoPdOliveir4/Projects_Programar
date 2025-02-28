import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/infrastructure/auth/auth.module';
import { TaskController } from 'src/tasks/task.controller';
import { Task } from 'src/tasks/task.entity';
import { TaskRepository } from 'src/tasks/task.repository';
import { TaskService } from 'src/tasks/task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Programar com você!',
    }),
  ],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
