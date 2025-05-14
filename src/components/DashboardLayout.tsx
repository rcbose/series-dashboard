import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputBase,
  alpha,
  Avatar,
  Button,
  TextField,
  ClickAwayListener,
  Collapse,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import tssLogo from '../assets/tss-logo.svg';
import tssLogoSmall from '../assets/tss-logo-small.svg';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  AdminPanelSettings as AdminIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as AlertsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';

// TSS specific colors
const tssColors = {
  sidebarBg: '#0F1115',  // Dark sidebar background
  sidebarText: '#9DA5B4',
  sidebarActiveText: '#FFFFFF',
  sidebarActiveBg: '#1F2026',
  headerBg: '#FFFFFF',
  contentBg: '#F8F9FA',
};

const drawerWidth = 240;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  dashboardName?: string;
  onDashboardNameChange?: (name: string) => void;
  onAddWidget?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  dashboardName: propDashboardName,
  onDashboardNameChange,
  onAddWidget
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode, toggleTheme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardName, setDashboardName] = useState(propDashboardName || 'Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Dashboard']);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Update local state when prop changes
  useEffect(() => {
    if (propDashboardName) {
      setDashboardName(propDashboardName);
    }
  }, [propDashboardName]);

  // Set default dashboard name based on route
  useEffect(() => {
    if (location.pathname === '/create-dashboard' && !propDashboardName) {
      setDashboardName('New Dashboard');
    } else if (!propDashboardName) {
      setDashboardName('Dashboard');
    }
  }, [location.pathname, propDashboardName]);

  // Add keyboard shortcut for search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCreateDashboard = () => {
    navigate('/create-dashboard');
  };

  const handleDashboardNameClick = () => {
    setIsEditing(true);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(prevMode => !prevMode);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleDashboardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardName(event.target.value);
  };

  const handleMenuItemClick = (text: string) => {
    setExpandedItems((prevExpanded) => {
      if (prevExpanded.includes(text)) {
        return prevExpanded.filter((item) => item !== text);
      } else {
        return [...prevExpanded, text];
      }
    });
  };

  const handleDashboardNameBlur = () => {
    setIsEditing(false);
    if (onDashboardNameChange) {
      onDashboardNameChange(dashboardName);
    }
  };

  const handleDashboardNameKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      if (onDashboardNameChange) {
        onDashboardNameChange(dashboardName);
      }
    }
  };

  const menuItems: MenuItem[] = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      children: [
        { text: 'My Dashboard', icon: <DashboardIcon /> },
        { text: 'Analytics Dashboard', icon: <DashboardIcon /> },
        { text: 'Monitoring Dashboard', icon: <DashboardIcon /> }
      ]
    },
    { text: 'Discover', icon: <SearchIcon /> },
    { text: 'Admin', icon: <AdminIcon /> },
    { text: 'Alerts', icon: <AlertsIcon /> },
    { text: 'Notifications', icon: <NotificationsIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          height: '64px',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', position: 'relative' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              ...(open && { display: 'none' }),
              color: theme.palette.text.secondary,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2, minWidth: '300px', maxWidth: '600px' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate('/')}
              sx={{
                flexGrow: 0,
                display: { xs: 'none', sm: 'block' },
                fontWeight: 600,
                fontSize: '1rem',
                color: theme.palette.secondary.main,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Dashboard
            </Typography>

            {location.pathname === '/create-dashboard' && (
              <>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    mx: 1.5,
                    color: 'text.secondary',
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {'>'}
                </Typography>

                {isEditing ? (
                  <ClickAwayListener onClickAway={handleDashboardNameBlur}>
                    <TextField
                      autoFocus
                      value={dashboardName}
                      onChange={handleDashboardNameChange}
                      onKeyDown={handleDashboardNameKeyDown}
                      onBlur={handleDashboardNameBlur}
                      variant="standard"
                      sx={{
                        marginLeft: 1,
                        minWidth: '150px',
                        maxWidth: '500px',
                        '& .MuiInputBase-root': {
                          fontWeight: 600,
                          fontSize: '1rem',
                          color: theme.palette.secondary.main,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                        },
                        '& .MuiInput-underline:before': {
                          borderBottomColor: theme.palette.secondary.main,
                        },
                        '& .MuiInput-underline:after': {
                          borderBottomColor: theme.palette.secondary.main,
                        },
                      }}
                    />
                  </ClickAwayListener>
                ) : (
                  <Box
                    onClick={handleDashboardNameClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: `1px dashed ${alpha(theme.palette.text.primary, 0.2)}`,
                      borderRadius: '4px',
                      padding: '4px 8px',
                      marginLeft: 1,
                      minWidth: '150px',
                      maxWidth: '500px',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.text.primary, 0.04),
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        display: { xs: 'none', sm: 'block' },
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: theme.palette.secondary.main,
                        mr: 1,
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }}
                    >
                      {dashboardName}
                    </Typography>
                    <EditIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.secondary.main,
                        fontSize: '0.875rem',
                      }}
                    />
                  </Box>
                )}
              </>
            )}

            {location.pathname !== '/create-dashboard' && (
              <>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    mx: 1.5,
                    color: 'text.secondary',
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {'>'}
                </Typography>

                {isEditing ? (
                  <ClickAwayListener onClickAway={handleDashboardNameBlur}>
                    <TextField
                      autoFocus
                      value={dashboardName}
                      onChange={handleDashboardNameChange}
                      onKeyDown={handleDashboardNameKeyDown}
                      onBlur={handleDashboardNameBlur}
                      variant="standard"
                      sx={{
                        marginLeft: 1,
                        minWidth: '150px',
                        maxWidth: '500px',
                        '& .MuiInputBase-root': {
                          fontWeight: 600,
                          fontSize: '1rem',
                          color: theme.palette.secondary.main,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                        },
                        '& .MuiInput-underline:before': {
                          borderBottomColor: theme.palette.secondary.main,
                        },
                        '& .MuiInput-underline:after': {
                          borderBottomColor: theme.palette.secondary.main,
                        },
                      }}
                    />
                  </ClickAwayListener>
                ) : (
                  <Box
                    onClick={handleDashboardNameClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: `1px dashed ${alpha(theme.palette.text.primary, 0.2)}`,
                      borderRadius: '4px',
                      padding: '4px 8px',
                      marginLeft: 1,
                      minWidth: '150px',
                      maxWidth: '500px',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.text.primary, 0.04),
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        display: { xs: 'none', sm: 'block' },
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: theme.palette.secondary.main,
                        mr: 1,
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }}
                    >
                      {dashboardName}
                    </Typography>
                    <EditIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.secondary.main,
                        fontSize: '0.875rem',
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>

          {/* Search bar with TSS style */}
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              position: 'relative',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.background.default, 1),
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.default, 1),
                border: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
              },
              margin: '0 auto',
              width: '400px',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.text.secondary,
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              inputRef={searchInputRef}
              placeholder="Search... (Ctrl+K)"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                color: theme.palette.text.primary,
                padding: '8px 8px 8px 0',
                paddingLeft: '48px',
                transition: theme.transitions.create('width'),
                width: '100%',
                fontSize: '0.875rem',
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* User profile and settings - TSS style */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isEditMode && onAddWidget && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddWidget}
                sx={{
                  mr: 2,
                  backgroundColor: theme.palette.secondary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  borderRadius: '4px',
                  padding: '6px 16px',
                }}
              >
                Add Widget
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleToggleEditMode}
              sx={{
                mr: 2,
                backgroundColor: isEditMode ? theme.palette.error.main : theme.palette.secondary.main,
                color: 'white',
                '&:hover': {
                  backgroundColor: isEditMode ? theme.palette.error.dark : theme.palette.secondary.dark,
                },
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                borderRadius: '4px',
                padding: '6px 16px',
              }}
            >
              {isEditMode ? 'Exit Edit Mode' : 'Edit Dashboard'}
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateDashboard}
              sx={{
                mr: 2,
                backgroundColor: theme.palette.secondary.main,
                color: 'white',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                },
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                borderRadius: '4px',
                padding: '6px 16px',
              }}
            >
              Create Dashboard
            </Button>
            <Avatar
              onClick={handleProfileMenuOpen}
              sx={{
                bgcolor: theme.palette.secondary.main,
                cursor: 'pointer',
                width: 32,
                height: 32,
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              DD
            </Avatar>
            <Menu
              anchorEl={profileMenuAnchorEl}
              open={isProfileMenuOpen}
              onClose={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Typography variant="body1">Profile</Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant="body1">Settings</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={toggleTheme}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {themeMode === 'light' ? (
                    <>
                      <Brightness4 sx={{ mr: 1 }} />
                      <Typography variant="body1">Switch to Dark Mode</Typography>
                    </>
                  ) : (
                    <>
                      <Brightness7 sx={{ mr: 1 }} />
                      <Typography variant="body1">Switch to Light Mode</Typography>
                    </>
                  )}
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Typography variant="body1">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            overflowX: 'hidden',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : tssColors.sidebarBg, // TSS sidebar
            borderRight: 'none',
            boxShadow: open ? theme.shadows[2] : 'none',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(open
              ? {
                }
              : {
                  width: theme.spacing(7),
                  [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                  },
                }),
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
            minHeight: '64px',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              ml: open ? 2 : 0,
              justifyContent: open ? 'flex-start' : 'center'
            }}
          >
            {open ? (
              <img
                src={tssLogo}
                alt="TSS Logo"
                style={{
                  height: '32px',
                  width: 'auto'
                }}
              />
            ) : (
              <img
                src={tssLogoSmall}
                alt="TSS Logo"
                style={{
                  height: '24px',
                  width: 'auto'
                }}
              />
            )}
          </Box>
          <IconButton onClick={handleDrawerClose} sx={{ color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : tssColors.sidebarText }}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <List sx={{ px: 1, mt: 2 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
                <ListItemButton
                  selected={index === 0} // Make the first item selected by default
                  onClick={() => item.children && handleMenuItemClick(item.text)}
                  sx={{
                    minHeight: 40,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                    py: 1,
                    borderRadius: theme.shape.borderRadius,
                    '&:hover': {
                      backgroundColor: index === 0 ? (theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.2) : tssColors.sidebarActiveBg) : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'),
                    },
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.2) : tssColors.sidebarActiveBg,
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.2) : tssColors.sidebarActiveBg,
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: index === 0 ? theme.palette.primary.main : (theme.palette.mode === 'dark' ? theme.palette.text.secondary : tssColors.sidebarText),
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: index === 0 ? (theme.palette.mode === 'dark' ? theme.palette.common.white : tssColors.sidebarActiveText) : (theme.palette.mode === 'dark' ? theme.palette.text.secondary : tssColors.sidebarText),
                    }}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {open && item.children && (
                    expandedItems.includes(item.text) ?
                    <ExpandLessIcon sx={{ color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : tssColors.sidebarText, opacity: open ? 1 : 0 }} /> :
                    <ExpandMoreIcon sx={{ color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : tssColors.sidebarText, opacity: open ? 1 : 0 }} />
                  )}
                </ListItemButton>
              </ListItem>

              {item.children && (
                <Collapse in={open && expandedItems.includes(item.text)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItem key={child.text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                        <ListItemButton
                          sx={{
                            minHeight: 40,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2,
                            py: 1,
                            pl: open ? 4 : 2, // Indent child items
                            borderRadius: theme.shape.borderRadius,
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                              color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : tssColors.sidebarText,
                            }}
                          >
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.text}
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : tssColors.sidebarText,
                            }}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          backgroundColor: theme.palette.background.default, // Background color from theme
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Box
          sx={{
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            p: 3,
            mb: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
