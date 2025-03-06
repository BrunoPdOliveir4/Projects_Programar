import { Alert, Snackbar } from '@mui/material';

interface CustomAlertProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

export const CustomAlert = ({ open, message, severity, onClose }: CustomAlertProps) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
