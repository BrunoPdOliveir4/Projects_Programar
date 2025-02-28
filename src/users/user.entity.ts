import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ length: 500 })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
