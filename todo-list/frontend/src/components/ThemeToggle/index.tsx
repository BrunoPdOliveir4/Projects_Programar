import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme as useAppTheme } from '../../hooks/useTheme';

export const ThemeToggle = ({ isAbsolute = true }: { isAbsolute: boolean }) => {
  const theme = useTheme();
  const { toggleTheme } = useAppTheme();

  return (
    <IconButton
      {...(isAbsolute && { sx: { position: 'absolute', top: 16, right: 16 } })}
      onClick={toggleTheme}
      color="inherit"
    >
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
