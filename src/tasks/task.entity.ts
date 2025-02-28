import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  status: 'open' | 'in_progress' | 'done' | 'archived';

  @Column()
  priority: 'low' | 'medium' | 'high';

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
