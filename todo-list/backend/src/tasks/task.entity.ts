import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;

  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy groceries',
  })
  @Column({ length: 500 })
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Milk, Bread, Butter',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: 'open',
    enum: ['open', 'in_progress', 'done', 'archived'],
  })
  @Column()
  status: 'open' | 'in_progress' | 'done' | 'archived';

  @ApiProperty({
    description: 'The priority of the task',
    example: 'medium',
    enum: ['low', 'medium', 'high'],
  })
  @Column()
  priority: 'low' | 'medium' | 'high';

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
