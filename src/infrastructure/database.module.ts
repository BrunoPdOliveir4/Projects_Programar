import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from 'src/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from 'src/tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'nestuser',
      password: 'Admin123',
      database: 'todolist',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
})
export class DatabaseModule {}
