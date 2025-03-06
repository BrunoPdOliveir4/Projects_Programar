import { Modal, Box, Typography, Button } from '@mui/material';
import TaskType from '../../types/TaskType';

interface TaskDeleteModalProps {
  open: boolean;
  onClose: () => void;
  task: TaskType | null;
  onConfirm: (task: TaskType) => void;
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

const TaskDeleteModal = ({ open, onClose, task, onConfirm }: TaskDeleteModalProps) => {
  if (!task) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Delete Task</Typography>
        <Typography>
          Are you sure you want to delete the task "{task.title}"?
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onConfirm(task);
              onClose();
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskDeleteModal;
