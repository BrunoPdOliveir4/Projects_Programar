import { Card, CardContent, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import TaskTable from "../../../components/TaskTable";
import TaskEditModal from "../../../components/TaskEditModal";
import TaskDeleteModal from "../../../components/TaskDeleteModal";
import TaskCreateModal from "../../../components/TaskCreateModal";
import { CustomAlert, ThemeToggle } from "../../../components";
import TaskService from "../../../services/TaskService";
import TaskType from "../../../types/TaskType";
import AddIcon from '@mui/icons-material/Add';
import "./styles.css";

const HomeScreen = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [editTask, setEditTask] = useState<TaskType | null>(null);
  const [deleteTask, setDeleteTask] = useState<TaskType | null>(null);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const showAlert = (message: string, severity: 'success' | 'error') => {
    setAlert({ open: true, message, severity });
  };

  const loadTasks = async () => {
    try {
      const data = await TaskService.getTasks();
      setTasks(data.tasks);
    } catch (error) {
      showAlert(`Failed to load tasks ${error}`, 'error');
    }
  };

  const handleCreateTask = async (newTask: Omit<TaskType, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      await TaskService.createTask(newTask);
      await loadTasks();
      showAlert("Task created", 'success');
      setIsCreateModalOpen(false);
    } catch (error) {
      showAlert(`Failed to create task ${error}`, 'error');
    }
  };

  const handleSaveEdit = async (updatedTask: TaskType) => {
    try {
      const response = await TaskService.updateTask(updatedTask.id, updatedTask);
      await loadTasks();
      showAlert(`Task edited: ${response.title}`, 'success');
      setEditTask(null);
    } catch (error) {
      showAlert(`Failed to update task ${error}`, 'error');
    }
  };

  const handleConfirmDelete = async (task: TaskType) => {
    try {
      const response = await TaskService.deleteTask(task.id);
      await loadTasks();
      showAlert(response.message, 'success');
      setDeleteTask(null);
      await loadTasks();
    } catch (error) {
      showAlert(`Failed to delete task ${error}`, 'error');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <h1>Your tasks</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsCreateModalOpen(true)}
              >
                New Task
              </Button>
              <ThemeToggle isAbsolute={false} />
            </div>
          </Box>
          <TaskTable
            tasks={tasks}
            onEdit={setEditTask}
            onDelete={setDeleteTask}
          />
        </CardContent>
      </Card>

      <TaskCreateModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateTask}
      />

      <TaskEditModal
        open={!!editTask}
        onClose={() => setEditTask(null)}
        task={editTask}
        onSave={handleSaveEdit}
      />

      <TaskDeleteModal
        open={!!deleteTask}
        onClose={() => setDeleteTask(null)}
        task={deleteTask}
        onConfirm={handleConfirmDelete}
      />

      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </div>
  );
};

export default HomeScreen;
