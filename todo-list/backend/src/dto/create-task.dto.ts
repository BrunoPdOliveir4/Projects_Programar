import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy groceries',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Milk, Bread, Butter',
  })
  description: string;

  @ApiProperty({
    description: 'The priority of the task',
    example: 'medium',
    enum: ['low', 'medium', 'high'],
  })
  priority: 'low' | 'medium' | 'high';
}
