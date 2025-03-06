import TaskType from "./TaskType";
interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  tasks: TaskType[];
  createdAt: Date;
  updatedAt: Date;
}

export default UserType;