import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy groceries',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Milk, Bread, Eggs',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The priority of the task',
    example: 'medium',
    enum: ['low', 'medium', 'high'],
    required: false,
  })
  priority?: 'low' | 'medium' | 'high';
  @ApiProperty({
    description: 'The status of the task',
    example: 'open',
    enum: ['open', 'in_progress', 'done'],
    required: false,
  })
  status?: 'open' | 'in_progress' | 'done';
}
