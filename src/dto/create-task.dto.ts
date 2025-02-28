export class CreateTaskDto {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}
