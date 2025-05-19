// Dark theme configuration
import { createTheme } from '@mui/material/styles';

// Color palette - TSS inspired
const primary = {
  main: '#7B44C0',  // Lighter TSS purple for dark mode
  light: '#9A6AD0',
  dark: '#632CA6',
  contrastText: '#fff',
};

const secondary = {
  main: '#6E6EFF',  // Lighter TSS blue for dark mode
  light: '#9090FF',
  dark: '#4D4DFF',
  contrastText: '#fff',
};

const success = {
  main: '#00A957',  // Lighter TSS green for dark mode
  light: '#00C969',
  dark: '#008846',
  contrastText: '#fff',
};

const info = {
  main: '#4A94EB',  // Lighter TSS info blue for dark mode
  light: '#7AB2F0',
  dark: '#1A73E8',
  contrastText: '#fff',
};

const warning = {
  main: '#FFAD33',  // Lighter TSS orange for dark mode
  light: '#FFC266',
  dark: '#FF9900',
  contrastText: '#fff',
};

const error = {
  main: '#E65C5C',  // Lighter TSS red for dark mode
  light: '#EC8989',
  dark: '#E02F2F',
  contrastText: '#fff',
};

const grey = {
  50: '#232323',
  100: '#2C2C2C',
  200: '#333333',
  300: '#404040',
  400: '#4D4D4D',
  500: '#666666',
  600: '#808080',
  700: '#999999',
  800: '#B3B3B3',
  900: '#CCCCCC',
};

// TSS specific colors for dark theme
const tssColors = {
  sidebarBg: '#0A0C0F',  // Darker sidebar background for dark mode
  sidebarText: '#9DA5B4',
  sidebarActiveText: '#FFFFFF',
  sidebarActiveBg: '#1A1C22',  // Slightly darker active background
  headerBg: '#121212',  // Dark header background
  contentBg: '#1E1E1E',  // Dark content background
};

// Create the dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary,
    secondary,
    success,
    info,
    warning,
    error,
    grey,
    background: {
      default: tssColors.contentBg,
      paper: '#252525',  // Slightly lighter than background for cards
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
      disabled: '#707070',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
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
    '0px 1px 2px rgba(0, 0, 0, 0.25)',
    '0px 2px 4px rgba(0, 0, 0, 0.25)',
    '0px 4px 8px rgba(0, 0, 0, 0.25)',
    '0px 6px 12px rgba(0, 0, 0, 0.25)',
    '0px 8px 16px rgba(0, 0, 0, 0.25)',
    '0px 10px 20px rgba(0, 0, 0, 0.25)',
    '0px 12px 24px rgba(0, 0, 0, 0.25)',
    '0px 14px 28px rgba(0, 0, 0, 0.25)',
    '0px 16px 32px rgba(0, 0, 0, 0.25)',
    '0px 18px 36px rgba(0, 0, 0, 0.25)',
    '0px 20px 40px rgba(0, 0, 0, 0.25)',
    '0px 22px 44px rgba(0, 0, 0, 0.25)',
    '0px 24px 48px rgba(0, 0, 0, 0.25)',
    '0px 26px 52px rgba(0, 0, 0, 0.25)',
    '0px 28px 56px rgba(0, 0, 0, 0.25)',
    '0px 30px 60px rgba(0, 0, 0, 0.25)',
    '0px 32px 64px rgba(0, 0, 0, 0.25)',
    '0px 34px 68px rgba(0, 0, 0, 0.25)',
    '0px 36px 72px rgba(0, 0, 0, 0.25)',
    '0px 38px 76px rgba(0, 0, 0, 0.25)',
    '0px 40px 80px rgba(0, 0, 0, 0.25)',
    '0px 42px 84px rgba(0, 0, 0, 0.25)',
    '0px 44px 88px rgba(0, 0, 0, 0.25)',
    '0px 46px 92px rgba(0, 0, 0, 0.25)',
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
          boxShadow: '0px 1px 0px rgba(255, 255, 255, 0.1)',
          backgroundColor: tssColors.headerBg,
          color: '#E0E0E0',
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
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.05)',
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
    // Dark mode specific overrides
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

export default darkTheme;
