import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import TaskType from '../../types/TaskType';

interface TaskCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Omit<TaskType, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

const TaskCreateModal = ({ open, onClose, onSave }: TaskCreateModalProps) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'open' as TaskType['status'],
    priority: 'medium' as TaskType['priority']
  });

  const handleSave = () => {
    onSave(newTask);
    setNewTask({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Create New Task</Typography>
        <TextField
          label="Title"
          required
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={newTask.status}
            label="Status"
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskType['status'] })}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={newTask.priority}
            label="Priority"
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskType['priority'] })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!newTask.title}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskCreateModal;
