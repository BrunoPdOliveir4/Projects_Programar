interface TaskType {
   id: number
   title: string;
   description: string;
   status: 'open' | 'in_progress' | 'done' | 'archived';
   priority: 'low' | 'medium' | 'high';
   createdAt: Date;
   updatedAt: Date;
   userId: number;
}

export default TaskType;