// Light theme configuration
import { createTheme } from '@mui/material/styles';

// Color palette - TSS inspired
const primary = {
  main: '#632CA6',  // TSS purple
  light: '#7B44C0',
  dark: '#4A1F80',
  contrastText: '#fff',
};

const secondary = {
  main: '#4D4DFF',  // TSS blue
  light: '#7070FF',
  dark: '#3939CC',
  contrastText: '#fff',
};

const success = {
  main: '#008846',  // TSS green
  light: '#00A957',
  dark: '#006634',
  contrastText: '#fff',
};

const info = {
  main: '#1A73E8',  // TSS info blue
  light: '#4A94EB',
  dark: '#0D5BBD',
  contrastText: '#fff',
};

const warning = {
  main: '#FF9900',  // TSS orange
  light: '#FFAD33',
  dark: '#CC7A00',
  contrastText: '#fff',
};

const error = {
  main: '#E02F2F',  // TSS red
  light: '#E65C5C',
  dark: '#B32424',
  contrastText: '#fff',
};

const grey = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#EEEEEE',
  300: '#E0E0E0',
  400: '#BDBDBD',
  500: '#9E9E9E',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

// TSS specific colors for light theme
const tssColors = {
  sidebarBg: '#0F1115',  // Dark sidebar background
  sidebarText: '#9DA5B4',
  sidebarActiveText: '#FFFFFF',
  sidebarActiveBg: '#1F2026',
  headerBg: '#FFFFFF',
  contentBg: '#F8F9FA',
};

// Create the light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary,
    secondary,
    success,
    info,
    warning,
    error,
    grey,
    background: {
      default: tssColors.contentBg,
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1D2025',
      secondary: '#646B82',
      disabled: '#9DA5B4',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.05)',
    '0px 6px 12px rgba(0, 0, 0, 0.05)',
    '0px 8px 16px rgba(0, 0, 0, 0.05)',
    '0px 10px 20px rgba(0, 0, 0, 0.05)',
    '0px 12px 24px rgba(0, 0, 0, 0.05)',
    '0px 14px 28px rgba(0, 0, 0, 0.05)',
    '0px 16px 32px rgba(0, 0, 0, 0.05)',
    '0px 18px 36px rgba(0, 0, 0, 0.05)',
    '0px 20px 40px rgba(0, 0, 0, 0.05)',
    '0px 22px 44px rgba(0, 0, 0, 0.05)',
    '0px 24px 48px rgba(0, 0, 0, 0.05)',
    '0px 26px 52px rgba(0, 0, 0, 0.05)',
    '0px 28px 56px rgba(0, 0, 0, 0.05)',
    '0px 30px 60px rgba(0, 0, 0, 0.05)',
    '0px 32px 64px rgba(0, 0, 0, 0.05)',
    '0px 34px 68px rgba(0, 0, 0, 0.05)',
    '0px 36px 72px rgba(0, 0, 0, 0.05)',
    '0px 38px 76px rgba(0, 0, 0, 0.05)',
    '0px 40px 80px rgba(0, 0, 0, 0.05)',
    '0px 42px 84px rgba(0, 0, 0, 0.05)',
    '0px 44px 88px rgba(0, 0, 0, 0.05)',
    '0px 46px 92px rgba(0, 0, 0, 0.05)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: secondary.main, // TSS uses blue as primary button color
          '&:hover': {
            backgroundColor: secondary.dark,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
          backgroundColor: tssColors.headerBg,
          color: '#1D2025',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: tssColors.sidebarBg,
          color: tssColors.sidebarText,
          border: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: 4,
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&.Mui-selected': {
            backgroundColor: tssColors.sidebarActiveBg,
            color: tssColors.sidebarActiveText,
            '&:hover': {
              backgroundColor: tssColors.sidebarActiveBg,
            },
            '& .MuiListItemIcon-root': {
              color: primary.main,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: tssColors.sidebarText,
          minWidth: 40,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      },
    },
  },
});

export default lightTheme;
