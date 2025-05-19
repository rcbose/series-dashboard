import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  sx?: object;
}

const ThemeToggle = ({ sx }: ThemeToggleProps) => {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton onClick={toggleTheme} color="inherit" sx={sx}>
        {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
