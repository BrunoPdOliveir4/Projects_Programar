import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import TaskType from '../../types/TaskType';

interface TaskEditModalProps {
  open: boolean;
  onClose: () => void;
  task: TaskType | null;
  onSave: (task: TaskType) => void;
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

const TaskEditModal = ({ open, onClose, task, onSave }: TaskEditModalProps) => {
  const [editedTask, setEditedTask] = useState<TaskType | null>(null);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!editedTask) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Edit Task</Typography>
        <TextField
          label="Title"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={editedTask.status}
            label="Status"
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as TaskType['status'] })}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={editedTask.priority}
            label="Priority"
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as TaskType['priority'] })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            onSave(editedTask);
            onClose();
          }}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskEditModal;
