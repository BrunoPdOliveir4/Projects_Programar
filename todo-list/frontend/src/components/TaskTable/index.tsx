import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Paper, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskType from '../../types/TaskType';

interface TaskTableProps {
  tasks: TaskType[];
  onEdit: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

const TaskTable = ({ tasks, onEdit, onDelete }: TaskTableProps) => {
  const getStatusColor = (status: TaskType['status']) => {
    const colors = {
      open: 'info',
      in_progress: 'warning',
      done: 'success',
      archived: 'default'
    } as const;
    return colors[status];
  };

  const getPriorityColor = (priority: TaskType['priority']) => {
    const colors = {
      low: 'success',
      medium: 'warning',
      high: 'error'
    } as const;
    return colors[priority];
  };

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams<TaskType>) => (
        <Chip
          label={params.value?.replace('_', ' ').toUpperCase()}
          color={getStatusColor(params.value)}
          size="small"
        />
      )
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 100,
      renderCell: (params: GridRenderCellParams<TaskType>) => (
        <Chip
          label={params.value?.toUpperCase()}
          color={getPriorityColor(params.value)}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params: GridRenderCellParams<TaskType>) => (
        <>
          <IconButton onClick={() => onEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(params.row)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Paper>
  );
};

export default TaskTable;
