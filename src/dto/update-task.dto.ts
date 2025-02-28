export class UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}
