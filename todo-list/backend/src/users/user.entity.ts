import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'The id of the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @Column({ length: 500 })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john_doe@example.com',
  })
  @Column({ length: 500 })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'strongPassword123',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The tasks associated with the user',
    type: () => [Task],
  })
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ApiProperty({
    description: 'The date when the user was created',
    example: '2023-10-01T00:00:00.000Z',
  })
  @Column()
  created_at: Date;

  @ApiProperty({
    description: 'The date when the user was last updated',
    example: '2023-10-01T00:00:00.000Z',
    nullable: true,
  })
  @Column({ nullable: true })
  updated_at: Date;
}
