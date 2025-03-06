import TaskType from "../types/TaskType";
import axios from "axios";

const TaskApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const TaskService = {
  getTasks: async () => {
    try {
      const response = await TaskApi.post("users/tasks");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch tasks ${error}`);
    }
  },

  createTask: async (task: Omit<TaskType, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      const response = await TaskApi.post("/tasks", task);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create task ${error}`);
    }
  },

  updateTask: async (taskId: number, task: Partial<TaskType>) => {
    try {
      const response = await TaskApi.put(`/tasks/${taskId}`, task);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update task ${error}`);
    }
  },

  deleteTask: async (taskId: number) => {
    try {
      const response = await TaskApi.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete task ${error}`);
    }
  }
};

export default TaskService;
